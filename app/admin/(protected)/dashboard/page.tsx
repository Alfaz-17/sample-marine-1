
import Link from 'next/link'
import { COLLECTIONS } from '@/lib/item-types'
import { getItemsCount } from '@/app/actions'
import { Package, Plus, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  // Fetch counts for all collections in parallel
  const stats = await Promise.all(
    COLLECTIONS.map(async (col) => ({
      name: col,
      count: await getItemsCount(col),
    }))
  )

  const totalItems = stats.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="p-6 md:p-12 space-y-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl">Dashboard</h1>
        <p className="text-muted-foreground font-light max-w-2xl">
          Overview of your current inventory and collections.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-foreground text-background p-8 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Total Items</span>
            <Package size={20} />
          </div>
          <p className="font-serif text-6xl">{totalItems}</p>
        </div>

        <Link 
          href="/admin/items" 
          className="group bg-background border border-foreground/10 p-8 rounded-lg space-y-4 hover:border-blue-500/50 hover:bg-blue-50/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-blue-600 transition-colors">Quick Action</span>
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl group-hover:text-blue-700 transition-colors">Manage Items</h3>
            <p className="text-sm text-muted-foreground font-light group-hover:text-blue-600/70">View, edit, or delete existing products.</p>
          </div>
        </Link>
        
         <Link 
          href="/admin/items?action=add" 
          className="group bg-background border border-foreground/10 p-8 rounded-lg space-y-4 hover:border-green-500/50 hover:bg-green-50/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-green-600 transition-colors">Quick Action</span>
             <Plus size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl group-hover:text-green-700 transition-colors">Add New Item</h3>
            <p className="text-sm text-muted-foreground font-light group-hover:text-green-600/70">Upload new inventory to the catalogue.</p>
          </div>
        </Link>
      </div>

      {/* Collection Breakdown */}
      <div className="space-y-8">
        <h2 className="font-serif text-2xl">Inventory by Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="border border-foreground/5 p-6 rounded-sm hover:bg-foreground/5 transition-colors">
              <div className="flex items-end justify-between mb-2">
                <span className="font-serif text-3xl">{stat.count}</span>
                <span className="text-xs text-muted-foreground">items</span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-primary font-medium border-t border-foreground/10 pt-4">
                {stat.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
