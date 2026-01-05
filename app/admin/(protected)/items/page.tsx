import { getItems } from '@/app/actions'
import ItemsManager from './ItemsManager'

export const dynamic = 'force-dynamic'

export default async function AdminItemsPage() {
  const items = await getItems()

  return (
    <div className="px-6 py-12">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">Items Management</h1>
            <p className="text-sm text-muted-foreground">Manage your product catalog</p>
          </div>
        </div>

        <ItemsManager initialItems={items} />
      </div>
    </div>
  )
}
