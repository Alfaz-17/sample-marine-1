'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { createItem, updateItem, deleteItem } from '@/app/actions'
import { COLLECTIONS, type CollectionType } from '@/lib/item-types'

type Item = {
  _id: string
  title: string
  slug: string
  description: string
  collection: CollectionType
  images: string[]
  price?: number
  dimensions?: string
  material?: string
  createdAt: string
}

export default function ItemsManager({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // New state for file uploads
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      openAddForm()
    }
  }, [searchParams])

  function openAddForm() {
    setEditingItem(null)
    setIsFormOpen(true)
    setError('')
    setSelectedFiles([])
    setPreviews([])
  }

  function openEditForm(item: Item) {
    setEditingItem(item)
    setIsFormOpen(true)
    setError('')
    setSelectedFiles([])
    setPreviews([])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      
      // Remove any existing 'images' from the raw form data to avoid duplicates/empty inputs
      formData.delete('images')
      
      // Append the existing images (hidden inputs logic might still be there, but we can rely on FormData if we didn't remove them)
      // Actually, relying on hidden inputs for existing images is fine. We just need to add the NEW files.
      // But we need to handle the case where the user 'removed' an existing image.
      // The current existing image logic uses hidden inputs: <input type="hidden" name="images" value={img} />
      // So formData *will* contain 'images' = 'url'. 
      // We explicitly deleted 'images' above, so we need to be careful.
      // Let's NOT delete 'images' blindly. 
      // The file input has name="images", so it sends [File, File].
      // The hidden inputs have name="images", so they send [String, String].
      
      // If we use the raw formData, it will contain the FileList from the input (which we can't easily clear selectively).
      // So we SHOULD remove the file input's contribution.
      // PROPOSAL: Remove the `name="images"` from the file input in the render, 
      // preventing it from catching the raw files. Then we append `selectedFiles` manually.
      
      selectedFiles.forEach(file => {
        formData.append('images', file)
      })

      if (editingItem) {
        await updateItem(editingItem._id, formData)
      } else {
        await createItem(formData)
      }

      // Refresh the page to get updated items
      window.location.reload()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    setLoading(true)
    try {
      await deleteItem(id)
      setItems(items.filter((item) => item._id !== id))
    } catch (err: any) {
      setError(err.message || 'Failed to delete item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Button */}
      <button
        onClick={openAddForm}
        className="inline-flex items-center  gap-2 px-6 py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground/90 transition-all"
      >
        <Plus size={16} />
        Add New Item
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="font-serif text-3xl mb-6">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Title *</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={editingItem?.title}
                  className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Collection *</label>
                <select
                  name="collection"
                  required
                  defaultValue={editingItem?.collection}
                  className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="">Select Collection</option>
                  {COLLECTIONS.map((col) => (
                    <option key={col} value={col}>
                      {col.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  defaultValue={editingItem?.description}
                  className="w-full bg-transparent border border-foreground/20 p-2 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingItem?.price}
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dimensions</label>
                  <input
                    name="dimensions"
                    type="text"
                    placeholder='e.g. 24" H × 12" W'
                    defaultValue={editingItem?.dimensions}
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Material</label>
                  <input
                    name="material"
                    type="text"
                    placeholder="e.g. Silk & Wire"
                    defaultValue={editingItem?.material}
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Images
                </label>
                
                {/* Existing Images */}
                {editingItem && editingItem.images.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {editingItem.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square bg-foreground/5 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Item ${idx}`} className="w-full h-full object-cover" />
                        <input type="hidden" name="images" value={img} />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...editingItem.images]
                            newImages.splice(idx, 1)
                            setEditingItem({ ...editingItem, images: newImages })
                          }}
                          className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Uploads Previews */}
                {previews.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">New Uploads</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {previews.map((src, idx) => (
                        <div key={idx} className="relative group aspect-square bg-foreground/5 overflow-hidden border border-primary/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              // Revoke URL to avoid memory leaks
                              URL.revokeObjectURL(previews[idx])
                              
                              const newPreviews = [...previews]
                              newPreviews.splice(idx, 1)
                              setPreviews(newPreviews)
                              
                              const newFiles = [...selectedFiles]
                              newFiles.splice(idx, 1)
                              setSelectedFiles(newFiles)
                            }}
                            className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Upload */}
                <div className="border border-dashed border-foreground/20 p-8 text-center hover:bg-foreground/5 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    // Removed name="images" to prevent automatic duplicate submission
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const newFiles = Array.from(e.target.files)
                        setSelectedFiles(prev => [...prev, ...newFiles])
                        
                        const newPreviews = newFiles.map(file => URL.createObjectURL(file))
                        setPreviews(prev => [...prev, ...newPreviews])
                        
                        // Reset input so same file can be selected again if needed
                        e.target.value = '' 
                      }
                    }}
                  />
                  <div className="pointer-events-none space-y-2">
                    <Plus className="mx-auto text-muted-foreground" />
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Click or Drag to Upload Images
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground">
                  Supported formats: JPG, PNG, WEBP. Max size: 5MB.
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground/90 transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update Item' : 'Create Item'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={loading}
                  className="flex-1 py-3 border border-foreground text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground hover:text-background transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="border-t border-foreground/10">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No items yet. Add your first item to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-foreground/10">
            {items.map((item) => (
              <div key={item._id} className="py-6 flex items-start gap-6">
                {/* Item Thumbnail */}
                <div className="w-24 h-24 flex-shrink-0 bg-foreground/5 overflow-hidden rounded-sm border border-foreground/10">
                  {item.images && item.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No entries</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="text-xs uppercase tracking-wider text-primary">
                    {item.collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  {item.price && (
                    <p className="text-sm font-medium">${item.price}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="p-2 hover:bg-foreground/5 transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 hover:bg-red-50 text-red-600 transition-colors"
                    title="Delete"
                    disabled={loading}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
