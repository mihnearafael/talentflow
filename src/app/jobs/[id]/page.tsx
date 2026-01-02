import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Building2,
    MapPin,
    Clock,
    Share2,
    Bookmark,
    Wallet,
    Briefcase,
    GraduationCap,
    LayoutGrid,
    ChevronLeft,
    ArrowRight,
    CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function JobDetailsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6 shadow-sm">
                <Link href="/jobs" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        TF
                    </div>
                    TalentFlow HR
                </Link>
            </header>

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <ChevronLeft className="h-4 w-4" /> Back to Jobs
                    </Link>
                </div>

                {/* Job Header */}
                <div className="rounded-xl border bg-card p-6 shadow-sm mb-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="flex gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-lg bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                TN
                            </div>
                            <div>
                                <div className="text-sm font-medium text-indigo-600 mb-1">TechNova Solutions</div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Senior Product Designer</h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        San Francisco, CA (Remote)
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        Design Team
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Posted 2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button size="lg" className="w-full md:w-auto">Apply Now</Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Description */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-8">
                            <section>
                                <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-4">About the Role</h3>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>We are looking for a Senior Product Designer to join our core experience team. You will be responsible for defining the user experience for our flagship product, working closely with product managers, engineers, and researchers to deliver high-quality design solutions.</p>
                                    <p>At TechNova, we believe design is a strategic differentiator. As a Senior Designer, you will have the autonomy to drive design initiatives and mentor junior designers while shaping the future of our design system.</p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-4">Key Responsibilities</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Lead end-to-end design projects from discovery to developer handoff.",
                                        "Conduct user research and usability testing to validate design decisions.",
                                        "Contribute to and maintain our design system (Figma).",
                                        "Collaborate with cross-functional teams to ensure design feasibility and quality."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-4">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>5+ years of experience in product design for web and mobile applications.</li>
                                    <li>Strong portfolio demonstrating expertise in UX thinking and UI craft.</li>
                                    <li>Proficiency in Figma, prototyping tools, and basic understanding of HTML/CSS.</li>
                                    <li>Excellent communication skills and ability to articulate design rationale.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-4">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { name: "Figma", level: "Expert", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { name: "Prototyping", level: "Advanced", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { name: "User Research", level: "Advanced", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { name: "HTML/CSS", level: "Basic", color: "bg-gray-100 text-gray-700 border-gray-200" },
                                        { name: "Design Systems", level: "Intermediate", color: "bg-gray-100 text-gray-700 border-gray-200" }
                                    ].map((skill) => (
                                        <div key={skill.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${skill.color}`}>
                                            <span className="font-semibold">{skill.name}</span>
                                            <span className="opacity-60">• {skill.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Similar Jobs */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold">Similar Jobs you might like</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold">Senior UX Designer</h4>
                                            <div className="text-sm text-muted-foreground">CreativePulse • Remote</div>
                                        </div>
                                        <Badge variant="secondary">Full-time</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Join our fast-paced team to design the next generation of marketing tools for creators.</p>
                                    <div className="text-sm font-semibold">$115k - $140k/yr</div>
                                </div>
                                <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold">Product Designer II</h4>
                                            <div className="text-sm text-muted-foreground">FinTech Co. • New York, NY</div>
                                        </div>
                                        <Badge variant="secondary">Hybrid</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">We are scaling our mobile banking app and need a designer with strong visual skills.</p>
                                    <div className="text-sm font-semibold">$100k - $130k/yr</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border bg-primary/5 p-6 border-primary/20">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-primary">Skill Match</h3>
                                <span className="font-bold text-primary">92%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-primary/20 mb-3">
                                <div className="h-full w-[92%] rounded-full bg-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground">Excellent! You have <strong>4/5</strong> top skills required for this role.</p>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <Wallet className="h-5 w-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Salary Range</div>
                                    <div className="font-bold">$120k - $150k<span className="text-muted-foreground font-normal text-sm">/year</span></div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <Briefcase className="h-5 w-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Employment Type</div>
                                    <div className="font-bold">Full-time</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <GraduationCap className="h-5 w-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Experience Level</div>
                                    <div className="font-bold">Mid-Senior Level</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <LayoutGrid className="h-5 w-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Industry</div>
                                    <div className="font-bold">SaaS / Technology</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">About the Company</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 overflow-hidden rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    TN
                                </div>
                                <div>
                                    <div className="font-bold">TechNova Solutions</div>
                                    <div className="text-xs text-muted-foreground">500-1000 employees</div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">TechNova is a leading provider of cloud-based solutions for enterprise resource planning. We help businesses streamline operations.</p>
                            <Link href="#" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                                View Company Profile <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
