'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, Instagram, Sparkles, Home, Layers, PenTool, Heart, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Signature', href: '/signature' },
    { name: 'Wedding', href: '/wedding' },
    { name: 'About', href: '/about' },
]

export function AuraNavbar() {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Don't render the public navbar on admin pages
    if (pathname?.startsWith('/admin')) {
        return null
    }
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 bg-background/70 backdrop-blur-md rounded-2xl border border-primary/10', isScrolled && 'bg-background/95 max-w-4xl backdrop-blur-xl lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-0 lg:gap-0 lg:py-0">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-3 -my-6">
                                <Image 
                                    src="/logo.png" 
                                    alt="Aura House of Flowers" 
                                    width={280} 
                                    height={100} 
                                    className="h-30 w-auto object-contain my-[-10] p-0 drop-shadow-md"
                                />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-50 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className={cn("m-auto size-6 duration-200", menuState ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100")} />
                                <X className={cn("absolute inset-0 m-auto size-6 duration-200", menuState ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0")} />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
                                {menuItems.map((item, index) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "relative group block transition-colors duration-300",
                                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                <span>{item.name}</span>
                                                <span className={cn(
                                                    "absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0",
                                                    isActive && "w-full left-0"
                                                )} />
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="hidden lg:flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                             <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className={cn('text-[11px] uppercase tracking-[0.2em]', isScrolled && 'lg:hidden')}>
                                <Link href="/contact">
                                    <span>Contact</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className={cn('text-[11px] uppercase tracking-[0.2em] bg-foreground text-background', isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                <Link href="/collections">
                                    <span>Explore</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {menuState && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-background/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setMenuState(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 right-0 z-40 h-screen w-[85%] max-w-sm bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-2xl border-l border-primary/20 shadow-2xl lg:hidden overflow-hidden"
                        >
                            {/* Decorative gradient orbs */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                            <div className="absolute top-1/2 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
                            
                            <div className="relative flex flex-col h-full p-8 pt-28">
                                {/* Menu Items */}
                                <nav className="flex-1 space-y-2">
                                    {menuItems.map((item, index) => {
                                        const isActive = pathname === item.href
                                        const icons = [Home, Layers, Sparkles, Heart, Info]
                                        const Icon = icons[index]
                                        
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + index * 0.08 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMenuState(false)}
                                                    className={cn(
                                                        "group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300",
                                                        isActive 
                                                            ? "bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                                                            : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
                                                        isActive 
                                                            ? "bg-primary/20 text-primary" 
                                                            : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                                    )}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-lg font-serif tracking-tight">{item.name}</span>
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="activeDot"
                                                            className="ml-auto w-2 h-2 rounded-full bg-primary"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </nav>

                                {/* Bottom Section */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-5 pt-6"
                                >
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                    
                                    {/* Contact Button */}
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full justify-start gap-3 h-12 text-sm border-primary/20 hover:bg-primary/5 hover:border-primary/30"
                                    >
                                        <Link href="/contact">
                                            <PenTool className="w-4 h-4" />
                                            Get in Touch
                                        </Link>
                                    </Button>

                                    {/* Instagram CTA */}
                                    <Link 
                                        href="https://www.instagram.com/aurahouseofflowers/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                                            <Instagram className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Follow Us</p>
                                            <p className="text-sm font-serif text-foreground">@aurahouseofflowers</p>
                                        </div>
                                        <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}
