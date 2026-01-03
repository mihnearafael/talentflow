import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full glass border-b border-border/40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left Side: Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm shadow-md">
                        TF
                    </div>
                    <span className="hidden sm:inline-block">TalentFlow</span>
                </Link>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/jobs" className="hover:text-primary transition-colors hover:bg-muted/50 px-3 py-2 rounded-md">
                        Jobs
                    </Link>
                    <Link href="/employees" className="hover:text-primary transition-colors hover:bg-muted/50 px-3 py-2 rounded-md">
                        Employees
                    </Link>
                    <Link href="/training" className="hover:text-primary transition-colors hover:bg-muted/50 px-3 py-2 rounded-md">
                        Training
                    </Link>
                    <Link href="/reviews" className="hover:text-primary transition-colors hover:bg-muted/50 px-3 py-2 rounded-md">
                        Reviews
                    </Link>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-2">
                    <Link href="/settings">
                        <Button variant="ghost" size="icon" className="hover:bg-muted/60">
                            <Settings className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </Link>
                    <Button size="sm" className="shadow-sm hover:shadow-md transition-all">
                        <Plus className="h-4 w-4 mr-1" /> Quick Add
                    </Button>
                </div>
            </div>
        </nav>
    );
}
