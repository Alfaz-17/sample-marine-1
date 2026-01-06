'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'

export function AuraHeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <main className="relative bg-background overflow-hidden min-h-[95vh] flex items-center justify-center pt-32 pb-16 lg:pt-32 lg:pb-0">
             {/* Cinematic Background Elements */}
             <div className="absolute top-0 right-0 w-[60%] h-full bg-secondary/10 rounded-l-[150px] -z-10 hidden lg:block backdrop-blur-3xl" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* Text Content - Staggered Reveal */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="space-y-10 lg:pr-12 text-center lg:text-left"
                >
                     <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/40 mb-8">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
                                Est. 2024 • Bhavnagar
                            </span>
                        </div>

                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-primary tracking-tight">
                            🌸 Botanical elegance & <br/>
                            <span className="italic font-light text-foreground/90">timeless design</span>
                        </h1>
                     </motion.div>

                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                        className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
                    >
                        Crafting serene spaces with nature's artistry
                    </motion.p>

                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                        className="text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 italic"
                    >
                        Where every bloom tells your story 
                    </motion.p>

                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                        className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4"
                    >
                        <Button asChild size="lg" className="rounded-full h-16 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase tracking-[0.2em] font-bold shadow-2xl shadow-primary/25 hover:scale-105 transition-transform duration-300">
                            <Link href="/collections">
                                Shop Collections
                            </Link>
                        </Button>
                        <Link href="/contact" className="group flex items-center gap-3 text-primary font-semibold text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <ArrowRight size={14} className="ml-0.5" />
                            </div>
                            Visit Studio
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Visual Content - Cinematic Frame */}
                <motion.div 
                    style={{ y: y1 }}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative perspective-1000 mt-12 lg:mt-0"
                >
                    <div className="relative aspect-[4/5] md:aspect-[3.5/4] lg:aspect-[4/5] w-full max-w-xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 border-[8px] border-white ring-1 ring-black/5 group">
                        
                        {/* The Cinematic Image with 'Ken Burns' effect (Slow Zoom) */}
                        <motion.div 
                            className="relative w-full h-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 8, ease: "linear" }}
                        >
                             <Image
                                src="/main-refined.png" 
                                alt="Aura Flower Shop Storefront"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Cinematic Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-40 pointer-events-none" />

                         {/* Floating Glass Card */}
                       
                    </div>
                    
                    {/* Abstract Floating Orbs for Depth */}
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10 mix-blend-multiply" />
                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-secondary/30 rounded-full blur-[80px] -z-10 mix-blend-multiply" />
                </motion.div>
            </div>
        </main>
    )
}
