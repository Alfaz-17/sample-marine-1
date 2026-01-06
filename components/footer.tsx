import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t px-6 md:px-12 pt-24 pb-12">
      <div className="max-w-screen-2xl mx-auto space-y-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group">
              <Image 
                  src="/logo.png" 
                  alt="Aura House of Flowers" 
                  width={200}
                  height={80}
                  className="w-48 h-auto object-contain -ml-2"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-light">
              Premium distributor of curated botanical elements for modern interiors. Recognized for quality since 2008.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Collections", href: "/collections" },
                { label: "Signature Pieces", href: "/signature" },
                { label: "Wedding & Ceremonial", href: "/wedding" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                DEVVAN COMPLEX, G-6, Atabhai Rd,<br />
                near SMILING SCOOPS, CHOWK,<br />
                Bhavnagar, Gujarat 364001
              </p>
              <p className="pt-2">+91 9737828614</p>
              <p>www.aurahouseofflowers.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Connect</h4>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/aurahouseofflowers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border flex items-center justify-center rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">@aurahouseofflowers</p>
            <div className="pt-4 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Newsletter</p>
              <form className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground transition-colors font-light"
                />
                <button type="submit" className="absolute right-0 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Large Logo Bottom */}
        <div className="relative overflow-hidden py-12">
          <div className="text-[15vw] md:text-[20vw] font-serif text-foreground/[0.03] leading-none text-center select-none pointer-events-none">
            Aura
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© 2026 Aura House of Flowers. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
