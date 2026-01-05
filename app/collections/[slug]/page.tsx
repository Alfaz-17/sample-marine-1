import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ArrowLeft, Plus } from "lucide-react"

import { getItems } from '@/app/actions'
import { COLLECTIONS, type CollectionType } from '@/lib/item-types'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
  
  // Validate slug is a valid collection type, otherwise default or handle 404 behavior if desired
  // For now we pass it, but safely cast or check if it matches types
  const items = await getItems(slug as CollectionType)

  return (
    <main className="min-h-screen bg-background">
      <header className="pt-32 md:pt-48 pb-12 px-6 md:px-12 border-b">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Back to collections
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-6xl">{title}</h1>
              <p className="text-sm text-muted-foreground font-light max-w-xl leading-relaxed">
                Each piece is carefully curated for material realism and spatial harmony. Perfect for interior
                designers, architects, and discerning homeowners.
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-2">
              Showing {items.length} Elements
            </p>
          </div>
        </div>
      </header>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {items.length === 0 ? (
            <div className="col-span-full py-24 text-center text-muted-foreground">
              <p className="text-xl font-serif">No items found in this collection yet.</p>
              <p className="text-sm mt-2">Check back soon for new arrivals.</p>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={item._id} className="group space-y-6">
                <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5">
                  <Link href={`/item/${item.slug}`}>
                    <Image
                      src={item.images?.[0] || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </Link>
                  <button className="absolute bottom-6 right-6 w-12 h-12 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg hover:bg-foreground hover:text-background">
                    <Plus size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium leading-none">{item.title}</h3>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Limited Series</p>
                    </div>
                    {item.price && <p className="text-sm font-serif italic">${item.price}</p>}
                  </div>
                  <div className="pt-2 space-y-1 text-[10px] text-muted-foreground font-light border-t border-foreground/5">
                    {item.dimensions && <p>Dimensions: {item.dimensions}</p>}
                    {item.material && <p>Material: {item.material}</p>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-48">
        <div className="max-w-screen-2xl mx-auto border-t pt-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <span className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold">Trade Program</span>
            <h2 className="font-serif text-3xl md:text-5xl">
              Interior Designers & <span className="italic">Architects</span>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Join our exclusive trade program for priority access, volume pricing, and dedicated project support.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 border border-foreground text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground hover:text-background transition-all"
            >
              Inquire About Trade Access
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
