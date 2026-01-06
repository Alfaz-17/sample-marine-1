import Image from "next/image"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Instagram, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-24 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold">Get in Touch</span>
            <h1 className="font-serif text-5xl md:text-8xl leading-none text-primary">
              Let's Create Something <span className="italic">Beautiful</span>
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-loose max-w-2xl mx-auto">
              Whether you're an interior designer, architect, or homeowner, we're here to help bring your botanical
              vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl">Visit Our Studio</h2>
              <p className="text-muted-foreground font-light leading-relaxed">
                Experience our curated collections in person. Schedule an appointment to explore our full range of
                botanical elements.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-primary" size={20} strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Location</p>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    DEVVAN COMPLEX, G-6, Atabhai Rd
                    <br />
                    Bhavnagar, Gujarat 364001
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-primary" size={20} strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Phone</p>
                  <a
                    href="tel:+919737828614"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +91 9737828614
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-primary" size={20} strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Email</p>
                  <a
                    href="mailto:info@aurahouseofflowers.com"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@aurahouseofflowers.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="mt-1 text-primary" size={20} strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Instagram</p>
                  <a
                    href="https://www.instagram.com/aurahouseofflowers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                  >
                    @aurahouseofflowers
                  </a>
                  <br />
                  <a
                    href="https://www.instagram.com/gujarat_florist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                  >
                    @gujarat_florist (Wedding Services)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-1 text-primary" size={20} strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Studio Hours</p>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Monday - Saturday: 10:00 AM - 7:00 PM
                    <br />
                    Sunday: By Appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Project Type</label>
                  <select className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light">
                    <option value="">Select...</option>
                    <option value="residential">Residential Interior</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="event">Event / Wedding</option>
                    <option value="trade">Trade / Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Subject *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Message *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors font-light resize-none placeholder:text-muted-foreground/40"
                />
              </div>

              <a
                href="https://wa.me/919737828614?text=Hello%20Aura%20House%20of%20Flowers,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#25D366]/90 transition-all"
              >
                <span className="fill-current">
                   <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </span>
                Chat on WhatsApp
              </a>

              <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                * Required fields. We typically respond within 24-48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-screen-2xl mx-auto relative aspect-[21/9] overflow-hidden">
          <Image
            src="/luxury-interior-with-artificial-floral-installatio.jpg"
            alt="Aura Studio"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-6xl">Trade Program</h2>
          <p className="text-lg opacity-70 leading-relaxed font-light max-w-2xl mx-auto">
            Are you an interior designer or architect? Join our exclusive trade program for priority access, volume
            pricing, and dedicated project support.
          </p>
          <button className="px-12 py-5 bg-background text-foreground text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all">
            Apply for Trade Access
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
