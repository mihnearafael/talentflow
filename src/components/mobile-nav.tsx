'use client'

import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

export function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-6 animate-in slide-in-from-top-5 duration-200">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" className="font-bold text-xl flex items-center gap-2" onClick={() => setOpen(false)}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
                                TF
                            </div>
                            TalentFlow
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>

                    <nav className="flex flex-col gap-6 text-lg font-medium">
                        <Link
                            href="/jobs"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Jobs
                        </Link>
                        <Link
                            href="/employees"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Employees
                        </Link>
                        <Link
                            href="/training"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Training
                        </Link>
                        <Link
                            href="/reviews"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Reviews
                        </Link>
                    </nav>

                    <div className="mt-8 pt-8 border-t">
                        <Link
                            href="/settings"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Settings
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
