import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Narrative Hero */}
      <section className="pt-32 md:pt-48 pb-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold">Since 2008</span>
            <h1 className="font-serif text-5xl md:text-8xl leading-none">
              Rooted in Design. <br />
              <span className="italic">Recognized</span> for Quality.
            </h1>
          </div>
          <div className="lg:col-span-5 max-w-md space-y-6">
            <p className="text-xl text-foreground font-light leading-relaxed italic">
              "A trusted partner for interior designers, architects, and discerning homeowners seeking refined
              artificial florals."
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Aura House of Flowers is a premium distributor of curated artificial floral décor and botanical elements
              for modern interiors. For 18 years, we have been the bridge between exceptional craftsmanship and
              considered design.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Journey - Large Image */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-screen-2xl mx-auto relative aspect-[21/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
          <Image
            src="/luxury-interior-with-artificial-floral-installatio.jpg"
            alt="Aura Studio"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-24 text-center space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold">What We Stand For</span>
            <h2 className="font-serif text-4xl md:text-6xl">
              Our <span className="italic">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Every collection we curate is selected for warmth of home, lasting elegance, material realism, and spatial
              harmony.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 lg:gap-12">
            {[
              {
                title: "Warmth of Home",
                description:
                  "We seek botanical elements that create an immediate sense of comfort and belonging. Each piece is selected to bring natural warmth into everyday environments.",
              },
              {
                title: "Lasting Elegance",
                description:
                  "Timeless design over fleeting trends. Our collections are curated to remain relevant and beautiful for years, embodying enduring sophistication.",
              },
              {
                title: "Material Realism",
                description:
                  "We distribute only those pieces that honor nature's complexity. Each stem, petal, and leaf is evaluated for its tactile authenticity and visual integrity.",
              },
              {
                title: "Spatial Harmony",
                description:
                  "Every element is chosen for its ability to integrate seamlessly into diverse interior landscapes, complementing rather than competing with architectural intent.",
              },
            ].map((value, idx) => (
              <div key={idx} className="space-y-6">
                <span className="font-serif text-4xl italic opacity-20">0{idx + 1}</span>
                <h3 className="font-serif text-2xl">{value.title}</h3>
                <p className="text-muted-foreground font-light leading-loose">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Narrative Section */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden">
              <Image
                src="/minimal-botanical-arrangement-on-stone.jpg"
                alt="Our Founder"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">The Visionary</span>
                <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                  Evelyn Vance <br />
                  <span className="italic">& The Studio Team.</span>
                </h2>
              </div>
              <div className="space-y-8 text-lg text-muted-foreground font-light leading-loose max-w-2xl">
                <p>
                  Evelyn's background in architecture and botanical studies informs every curation decision at Aura. She
                  believes that artificial florals are not substitutes but architectural elements in their own
                  right—capable of defining atmosphere, guiding movement, and anchoring presence.
                </p>
                <p>
                  As a distributor, we work directly with artisan workshops and premium manufacturers across the globe
                  to bring exclusive botanical elements to the North American market. Our role is both curator and
                  connector, bridging the gap between exceptional international craftsmanship and the refined needs of
                  interior designers, architects, and premium homeowners.
                </p>
                <p>
                  Today, the Aura studio operates from our Architectural District headquarters, where a dedicated team
                  evaluates every piece for authenticity, durability, and design integrity before it enters our
                  collection.
                </p>
              </div>
              <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-12 border-t">
                <div>
                  <p className="text-3xl font-serif">18</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-serif">150+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Design Partners</p>
                </div>
                <div>
                  <p className="text-3xl font-serif">800+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Projects Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Call to Action */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-foreground text-background overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="font-serif text-4xl md:text-7xl">Join the Aura Circle</h2>
          <p className="text-xl opacity-70 leading-relaxed font-light">
            Whether you're designing a private residence, a boutique hotel, or a corporate headquarters, we invite you
            to explore botanical solutions rooted in design and recognized for quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <Link
              href="/contact"
              className="px-12 py-5 bg-background text-foreground text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all"
            >
              Contact Our Studio
            </Link>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold"
            >
              Explore the Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-24 -left-12 text-[20vw] font-serif text-white/[0.03] leading-none pointer-events-none select-none">
          CULTURE
        </div>
      </section>

      <Footer />
    </main>
  )
}
