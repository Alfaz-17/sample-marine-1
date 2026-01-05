'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Items', href: '/admin/items', icon: Package },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-colors",
              isActive 
                ? "text-foreground font-semibold" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={14} className={cn(isActive ? "text-primary" : "opacity-70")} />
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}
