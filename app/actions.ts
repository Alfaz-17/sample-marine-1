'use server'

import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/db'
import Item from '@/lib/models/Item'
import { type CollectionType } from '@/lib/item-types'
import { auth } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'

// Helper to check admin authentication
async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }
  return session
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createItem(formData: FormData) {
  await requireAdmin()
  await connectDB()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as CollectionType
  const price = formData.get('price') as string
  const dimensions = formData.get('dimensions') as string
  const material = formData.get('material') as string
  
  // Handle image uploads
  const rawImages = formData.getAll('images')
  const images: string[] = []

  for (const img of rawImages) {
    if (img instanceof File) {
      if (img.size > 0 && img.name !== 'undefined') {
        const url = await uploadToCloudinary(img)
        images.push(url)
      }
    } else if (typeof img === 'string' && img.trim() !== '') {
      images.push(img as string)
    }
  }

  if (!title || !description || !category) {
    throw new Error('Title, description, and category are required')
  }

  let slug = generateSlug(title)
  let counter = 1
  
  // Ensure slug uniqueness
  while (await Item.findOne({ slug })) {
    slug = `${generateSlug(title)}-${counter}`
    counter++
  }

  const item = await Item.create({
    title,
    slug,
    description,
    category,
    images,
    price: price ? parseFloat(price) : undefined,
    dimensions: dimensions || undefined,
    material: material || undefined,
  })

  revalidatePath('/admin/items')
  revalidatePath(`/collections/${category}`)
  revalidatePath('/collections')

  return { success: true, item: JSON.parse(JSON.stringify(item)) }
}

export const getItems = cache(async (category?: CollectionType) => {
  await connectDB()

  const query = category ? { category } : {}
  // Only select fields needed for listing views to reduce data transfer
  const items = await Item.find(query)
    .select('_id title slug description category images price dimensions material createdAt')
    .sort({ createdAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(items))
})

export const getItemBySlug = cache(async (slug: string) => {
  await connectDB()

  const item = await Item.findOne({ slug }).lean()

  if (!item) {
    return null
  }

  return JSON.parse(JSON.stringify(item))
})

export async function updateItem(id: string, formData: FormData) {
  await requireAdmin()
  await connectDB()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as CollectionType
  const price = formData.get('price') as string
  const dimensions = formData.get('dimensions') as string
  const material = formData.get('material') as string

  // Handle image uploads
  const rawImages = formData.getAll('images')
  const images: string[] = []

  for (const img of rawImages) {
    if (img instanceof File) {
      if (img.size > 0 && img.name !== 'undefined') {
        const url = await uploadToCloudinary(img)
        images.push(url)
      }
    } else if (typeof img === 'string' && img.trim() !== '') {
      images.push(img as string)
    }
  }

  if (!title || !description || !category) {
    throw new Error('Title, description, and category are required')
  }

  let slug = generateSlug(title)
  let counter = 1

  // Ensure slug uniqueness (excluding current item)
  while (await Item.findOne({ slug, _id: { $ne: id } })) {
    slug = `${generateSlug(title)}-${counter}`
    counter++
  }

  const item = await Item.findByIdAndUpdate(
    id,
    {
      title,
      slug,
      description,
      category,
      images,
      price: price ? parseFloat(price) : undefined,
      dimensions: dimensions || undefined,
      material: material || undefined,
    },
    { new: true, runValidators: true }
  )

  if (!item) {
    throw new Error('Item not found')
  }

  revalidatePath('/admin/items')
  revalidatePath(`/collections/${category}`)
  revalidatePath(`/item/${slug}`)
  revalidatePath('/collections')

  return { success: true, item: JSON.parse(JSON.stringify(item)) }
}

export async function deleteItem(id: string) {
  await requireAdmin()
  await connectDB()

  const item = await Item.findByIdAndDelete(id)

  if (!item) {
    throw new Error('Item not found')
  }

  revalidatePath('/admin/items')
  revalidatePath(`/collections/${item.category}`)
  revalidatePath('/collections')

  return { success: true }
}

// Public function to get items count by collection
export async function getItemsCount(category?: CollectionType) {
  await connectDB()

  const query = category ? { category } : {}
  const count = await Item.countDocuments(query)

  return count
}
