import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CandidateHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6 shadow-sm justify-between">
            <div className="flex items-center gap-8">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        TF
                    </div>
                    TalentFlow HR
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
                    <Link href="/jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground">Jobs</Link>
                    <Link href="/interviews" className="text-sm font-medium text-muted-foreground hover:text-foreground">Interviews</Link>
                    <Link href="/assessments" className="text-sm font-medium text-muted-foreground hover:text-foreground">Assessments</Link>
                    <Link href="/offers/1" className="text-sm font-medium text-muted-foreground hover:text-foreground">Offers</Link>
                    <Link href="/profile/skills" className="text-sm font-medium text-muted-foreground hover:text-foreground">Profile</Link>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden w-64 md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="h-9 w-full rounded-md border border-input bg-gray-100 pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" alt="Avatar" className="h-full w-full object-cover" />
                </div>
            </div>
        </header>
    )
}
