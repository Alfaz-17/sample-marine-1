import Image from "next/image"
import Link from "next/link"
import { AuraHeroSection } from "@/components/ui/aura-hero"
import { Footer } from "@/components/footer"
import { ArrowRight, Instagram, MapPin, Phone } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <AuraHeroSection />

      {/* Brand Values / Trust Section */}
      <section className="py-24 px-6 md:px-12 bg-white relative">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4 p-8 rounded-3xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white border border-secondary flex items-center justify-center text-primary shadow-sm mb-6 mx-auto md:mx-0">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="font-serif text-2xl text-primary">Authentic Realism</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                    Botanicals selected for their tactile truth. We source only the finest artificial elements that mimic nature's imperfections.
                </p>
            </div>
            <div className="space-y-4 p-8 rounded-3xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white border border-secondary flex items-center justify-center text-primary shadow-sm mb-6 mx-auto md:mx-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></svg>
                </div>
                 <h3 className="font-serif text-2xl text-primary">Spatial Harmony</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                    Installations designed to breathe with your space. Our arrangements augment architecture rather than overwhelming it.
                </p>
            </div>
            <div className="space-y-4 p-8 rounded-3xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                 <div className="w-12 h-12 rounded-full bg-white border border-secondary flex items-center justify-center text-primary shadow-sm mb-6 mx-auto md:mx-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                </div>
                 <h3 className="font-serif text-2xl text-primary">Lasting Beauty</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                    Elegance that endures. Invest in décor that remains vibrant year-round without the need for constant maintenance.
                </p>
            </div>
        </div>
      </section>

      {/* Featured Collection: Rounded Cards & Soft Shadows */}
      <section className="py-24 px-6 md:px-12 bg-secondary/30">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
               <span className="inline-block px-3 py-1 rounded-full border border-primary/20 text-[10px] uppercase tracking-[0.2em] font-semibold text-primary bg-white/50 backdrop-blur-sm">
                  Curated Selections
               </span>
               <h2 className="font-serif text-4xl md:text-5xl text-primary">The Green Collection</h2>
            </div>
            <Link href="/collections" className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-transparent hover:border-primary transition-all pb-1 text-primary">
                View All Items <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Faux Botanicals",
                description: "Lifelike realism",
                image: "/collection_faux_botanicals.png",
              },
              {
                title: "Interior Trees",
                description: "Height & presence",
                image: "/collection_interior_trees.png",
              },
              {
                title: "Wall Installations",
                description: "Artistic greenery",
                image: "/collection_wall_installation.png",
              },
              {
                title: "Tabletop Accents",
                description: "Finishing touches",
                image: "/collection_tabletop_accents.png",
              },
              {
                title: "Ceramic Vessels",
                description: "Handcrafted pots",
                image: "/collection_ceramic_vessels.png",
              },
              {
                  title: "Signature Concepts",
                  description: "Bespoke designs",
                  image: "/collection_signature_concepts.png"
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/collections/${item.title.toLowerCase().replace(/ /g, "-")}`}
                className="group relative block aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-80 pl-1 border-l-2 border-accent">{item.description}</p>
                  <h3 className="font-serif text-3xl text-white group-hover:text-accent transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heroic Split Section - Signature */}
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
            <div className="relative h-[50vh] lg:h-auto overflow-hidden">
                <Image 
                    src="/signature_series_detail.png" 
                    alt="Signature Detail" 
                    fill 
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
            <div className="flex items-center justify-center p-12 lg:p-24 relative">
                <div className="max-w-md space-y-10 relative z-10">
                     <span className="text-accent text-[11px] uppercase tracking-[0.4em] font-bold">Signature Series</span>
                     <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                        Defined by <br/><span className="italic text-accent">Details.</span>
                     </h2>
                     <p className="text-lg opacity-80 leading-relaxed font-light">
                        Our signature pieces are more than just décor; they are sculptural elements designed to anchor a room. 
                        Featuring handcrafted ceramics and premium faux stems that challenge perception.
                     </p>
                     <Link href="/signature" className="inline-flex items-center gap-3 px-8 py-4 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground hover:text-primary transition-all text-[11px] uppercase tracking-[0.2em] font-semibold">
                        Discover Signature
                     </Link>
                </div>
                 {/* Decorative background text */}
                <div className="absolute right-0 bottom-0 text-[15rem] leading-none font-serif opacity-5 text-white pointer-events-none select-none translate-x-1/2 translate-y-1/2">
                    &
                </div>
            </div>
        </div>
      </section>

      {/* Wedding & Events Parallax-ish */}
      <section className="py-32 px-6 md:px-12 bg-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/damask-pattern.png')] bg-repeat" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-10">
               <div className="w-20 h-px bg-primary/30 mx-auto" />
               <h2 className="font-serif text-4xl md:text-6xl text-primary">
                    Gujarat Florist
                    <span className="block text-2xl md:text-3xl italic text-muted-foreground mt-4 font-normal">Ceremonial Artistry</span>
               </h2>
               <p className="text-lg text-muted-foreground/80 leading-loose max-w-2xl mx-auto">
                    For moments that matter. Our event division specializes in grand-scale floral installations for weddings and corporate galas.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                    <Link href="https://www.instagram.com/gujarat_florist" target="_blank" className="flex items-center gap-3 px-8 py-3 bg-white border border-border shadow-sm rounded-full text-foreground hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-[0.2em] font-semibold">
                         <Instagram size={16} /> @gujarat_florist
                    </Link>
                     <Link href="/wedding" className="flex items-center gap-3 px-8 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-all text-xs uppercase tracking-[0.2em] font-semibold">
                         Event Portfolio
                    </Link>
               </div>
          </div>
      </section>

      {/* CTA Footer Wrapper */}
      <section className="py-24 px-6 md:px-12 bg-background border-t border-border">
         <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
             
             {/* Abstract circles */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

             <div className="relative z-10 space-y-8">
                 <h2 className="font-serif text-4xl md:text-6xl">Ready to transform your space?</h2>
                 <p className="text-lg opacity-90 font-light max-w-2xl mx-auto">
                    Visit our Bhavnagar studio or schedule a consultation for a personalized curation.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                      <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                         <MapPin size={16} className="text-accent" />
                         <span className="text-sm">Bhavnagar, Gujarat</span>
                      </div>
                      <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                         <Phone size={16} className="text-accent" />
                         <span className="text-sm">+91 9737828614</span>
                      </div>
                 </div>
                 
                 <div className="pt-8">
                    <Link href="/contact" className="inline-block px-10 py-4 bg-white text-primary rounded-full font-semibold text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors">
                        Book Appointment
                    </Link>
                 </div>
             </div>
         </div>
      </section>

      <Footer />
    </main>
  )
}
