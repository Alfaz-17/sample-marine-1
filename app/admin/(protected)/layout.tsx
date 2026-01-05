import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth'
import Link from 'next/link'
import Image from 'next/image'

async function SignOutButton() {
  'use server'
  
  async function handleSignOut() {
    'use server'
    await signOut()
  }

  return (
    <form action={handleSignOut}>
      <button type="submit" className="text-[10px] uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors font-medium">
        Sign Out
      </button>
    </form>
  )
}

import { AdminNav } from './components/admin-nav'

// ... (existing helper function)

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
import Image from 'next/image'

// ...

          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="font-serif text-2xl">
              <Image 
                src="/AuraLogo.png" 
                alt="Aura Admin" 
                width={80} 
                height={80} 
                className="h-8 w-auto object-contain"
              />
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground hidden md:inline-block">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
    </div>
  )
}
