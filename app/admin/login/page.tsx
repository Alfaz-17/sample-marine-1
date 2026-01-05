'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin/dashboard')
    }
  }, [status, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Loading...</p></div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex flex-col items-center">
          <Image 
            src="/AuraLogo.png" 
            alt="Aura Admin" 
            width={150} 
            height={150} 
            className="h-20 w-auto object-contain mb-6"
            priority
          />
          <h1 className="font-serif text-4xl md:text-5xl mb-2">Aura Admin</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">Content Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-foreground/10 p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-foreground/90 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
