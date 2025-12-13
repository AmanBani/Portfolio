'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/images/logo.png'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'

const menuItems = [
    { name: 'About', href: '/About' },
    { name: 'Blogs', href: '/Blogs' },
    { name: 'Projects', href: '/Projects' },
    { name: 'Services', href: '/Services' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300 text-white">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4 text-white">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto text-white">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex space-x-2">
                                <Image src={Logo} alt="My Logo" width={50} height={50}/>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-white" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block ">
                                <ul className="flex items-center gap-10 text-sm font-sans">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
  href={item.href}
  className="text-white hover:text-blue-50 transition-discrete duration-50 p-4 text-2xl"
>
  {item.name}
</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="text-white bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden text-white">
                                <ul className="space-y-6 text-white">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className=" hover:text-accent-foreground block duration-150 text-white">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}