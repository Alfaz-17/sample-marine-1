import { getItemBySlug, getItems } from '@/app/actions'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { ArrowLeft, Plus } from 'lucide-react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const items = await getItems()
  return items.map((item: any) => ({
    slug: item.slug,
  }))
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getItemBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 md:pt-48 pb-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <Link
            href={`/collections/${item.collection}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={12} />
            Back to {item.collection.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Images */}
            <div className="space-y-4">
              {item.images && item.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {item.images.map((image: string, idx: number) => (
                    <div key={idx} className="aspect-[3/4] relative overflow-hidden bg-foreground/5">
                      <Image
                        src={image}
                        alt={`${item.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                  {item.collection.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </p>
                <h1 className="font-serif text-4xl md:text-6xl leading-tight">{item.title}</h1>
                {item.price && (
                  <p className="text-2xl font-serif italic">${item.price}</p>
                )}
              </div>

              <div className="pt-8 border-t space-y-6">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-3">Description</h2>
                  <p className="text-muted-foreground font-light leading-relaxed">{item.description}</p>
                </div>

                {item.dimensions && (
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-2">Dimensions</h3>
                    <p className="text-sm text-muted-foreground">{item.dimensions}</p>
                  </div>
                )}

                {item.material && (
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-2">Material</h3>
                    <p className="text-sm text-muted-foreground">{item.material}</p>
                  </div>
                )}
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground/90 transition-all"
                >
                  Inquire About This Piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
