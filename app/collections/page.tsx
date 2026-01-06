import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ChevronRight } from "lucide-react"

const categories = [
  {
    title: "Artificial Flowers",
    slug: "artificial-flowers",
    image: "/minimal-botanical-arrangement-on-stone.jpg",
    tagline: "Blooms that defy the seasons.",
    description:
      "High-quality artificial blooms designed to maintain their beauty year-round, bringing vibrant color and natural elegance to any space.",
    count: "48 Curated Pieces",
    priceRange: "",
  },
  {
    title: "Artificial Green Plants",
    slug: "artificial-green-plants",
    image: "/luxury-interior-with-artificial-floral-installatio.jpg",
    tagline: "Perpetual greenery without the demands.",
    description:
      "Maintenance-free botanical elements that provide the lush, refreshing look of real plants without watering, sunlight requirements, or upkeep.",
    count: "36 Curated Pieces",
    priceRange: "",
  },
  {
    title: "Hanging Greenery",
    slug: "hanging-greenery",
    image: "/large-artificial-floral-installation-wall.jpg",
    tagline: "Suspended elegance for living spaces.",
    description:
      "Transform vertical spaces with our curated selection of artificial hanging plants and cascading botanical elements that add depth and dimension to interiors.",
    count: "24 Curated Pieces",
    priceRange: "",
  },
  {
    title: "Bonsai",
    slug: "bonsai",
    image: "/luxury-artificial-orchid-arrangement.jpg",
    tagline: "Miniature contemplation in refined form.",
    description:
      "Artfully crafted artificial bonsai trees that capture the essence of this ancient art form, perfect for desks, shelves, and minimalist interiors.",
    count: "12 Limited Editions",
    priceRange: "",
  },
  {
    title: "Décor Accessories",
    slug: "decor-accessories",
    image: "/ceramic-gradient-pot-minimal.jpg",
    tagline: "Refined touches that complete the narrative.",
    description:
      "Complement your botanical collection with premium décor accessories designed to enhance and elevate your interior styling.",
    count: "Custom Selection",
    priceRange: "",
  },
]

import { getItemsCount } from '@/app/actions'
import { type CollectionType } from '@/lib/item-types'

export default async function CollectionsPage() {
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await getItemsCount(cat.slug as CollectionType)
      return {
        ...cat,
        count: `${count} Curated Pieces` // Update count string
      }
    })
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">The Archive</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none">Collections</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              Curated artificial floral décor and botanical elements selected for warmth of home, lasting elegance,
              material realism, and spatial harmony.
            </p>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="px-6 md:px-12 pb-48">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border-y border-foreground/10">
          {categoriesWithCounts.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group relative bg-background p-8 md:p-12 lg:p-20 overflow-hidden hover:bg-primary/5 active:bg-primary/10 transition-colors duration-300"
            >
              <div className="relative z-10 space-y-8 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{category.count}</p>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {category.priceRange}
                    </p>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl group-hover:italic group-active:italic transition-all duration-500">
                    {category.title}
                  </h2>
                  <p className="text-sm font-medium italic text-primary">{category.tagline}</p>
                  <p className="text-muted-foreground font-light leading-relaxed max-w-xs transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 opacity-60">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold">
                  Explore Series <ChevronRight size={14} className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/2 opacity-20 md:opacity-10 lg:opacity-5 group-hover:opacity-100 group-active:opacity-80 transition-all duration-1000">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-active:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
