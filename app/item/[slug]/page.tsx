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
                <h1 className="font-serif text-4xl md:text-6xl leading-tight text-primary">{item.title}</h1>
                {item.price && (
                  <p className="text-2xl font-serif italic">Rs. {item.price}</p>
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/919737828614?text=${encodeURIComponent(
                    `Hello Aura House of Flowers,\n\nI am interested in the "${item.title}" (${item.collection}).\n\nCould you please provide more details?`
                  )}`}
                  className="inline-flex items-center gap-3 px-12 py-5 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-[#25D366]/90 transition-all rounded-none"
                >
                  <span className="fill-current">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </span>
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
