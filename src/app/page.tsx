import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Star } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        TF
                    </div>
                    TalentFlow HR
                </div>
                <nav className="hidden gap-6 md:flex">
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">For Candidates</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">For Companies</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-sm font-medium">Log In</Button>
                    </Link>
                    <Link href="/login">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <Badge variant="secondary" className="text-primary bg-blue-50">NEW: AI RESUME PARSING</Badge>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                                Unlock Potential.<br />
                                <span className="text-primary">Streamline Growth.</span>
                            </h1>
                            <p className="max-w-[600px] text-lg text-muted-foreground">
                                The all-in-one platform connecting top talent with world-class teams. From first interview to executive promotion, we handle the entire lifecycle.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Link href="/login">
                                    <Button size="lg" className="px-8">Start Free Trial</Button>
                                </Link>
                                <Button size="lg" variant="outline" className="px-8">
                                    <span className="mr-2">▶</span> Book a Demo
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gray-200" />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">Trusted by 10,000+ HR professionals</p>
                            </div>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                                alt="Team collaborating"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Trusted By */}
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                        <p className="mb-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted by Industry Leaders</p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                            {["Acme Corp", "GlobalTech", "EcoSystems", "FastForward", "BlueOcean"].map((company) => (
                                <div key={company} className="flex items-center gap-2 text-xl font-bold">
                                    <div className="h-6 w-6 rounded bg-gray-400" />
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Modules */}
                <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Core Modules</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Everything you need to manage the employee lifecycle, from the first hello to the next big promotion.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "Smart Recruiting",
                                description: "AI-driven candidate ranking, automated scheduling, and collaborative hiring pipelines.",
                                icon: "S"
                            },
                            {
                                title: "Seamless Onboarding",
                                description: "Digital paperwork, automated team intros, and equipment provisioning checklists.",
                                icon: "O"
                            },
                            {
                                title: "Continuous Growth",
                                description: "360-degree performance reviews, OKR tracking, and personalized learning paths.",
                                icon: "G"
                            }
                        ].map((card) => (
                            <div key={card.title} className="rounded-xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-xl font-bold text-primary">
                                    {card.icon}
                                </div>
                                <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                                <p className="text-muted-foreground">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Feature Sections */}
                <section className="bg-gray-50">
                    <div className="container mx-auto grid gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                                alt="Candidate profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <Badge variant="secondary" className="text-blue-700 bg-blue-100">FOR CANDIDATES</Badge>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Land your dream job with AI-powered matching</h2>
                            <p className="text-lg text-muted-foreground">Stop sending resumes into a black hole. Our intelligent matching system puts your profile directly in front of hiring managers looking for specific skills.</p>
                            <ul className="space-y-3">
                                {["Resume builder with ATS optimization", "Direct messaging with recruiters", "Salary transparency on every listing"].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-primary" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="link" className="px-0 text-primary">Create candidate profile <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto grid gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div className="space-y-6 lg:order-1 order-2">
                        <Badge variant="secondary" className="text-purple-700 bg-purple-100">FOR COMPANIES</Badge>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Build high-performing teams, faster</h2>
                        <p className="text-lg text-muted-foreground">Streamline your entire HR stack. From sourcing to onboarding and performance management, TalentFlow gives you the data you need to make better people decisions.</p>
                        <ul className="space-y-3">
                            {["Automated pipeline analytics", "Customizable onboarding workflows", "Employee engagement surveys"].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-primary" />
                                    <span className="text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="link" className="px-0 text-primary">Explore employer tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:order-2 order-1">
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                            alt="Dashboard analytics"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>

                {/* Loved by People Teams */}
                <section className="bg-gray-50 py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-16 text-center text-3xl font-bold">Loved by People Teams</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    quote: "TalentFlow completely transformed how we hire. We cut our time-to-fill by half within the first three months. The onboarding module is a game changer.",
                                    author: "Sarah Jenkins",
                                    role: "VP of HR, TechGiant",
                                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                                },
                                {
                                    quote: "The performance tracking tools are intuitive and actually helpful. Our employees love the transparent goal setting features.",
                                    author: "Michael Chen",
                                    role: "Head of Talent, StartUp",
                                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                                },
                                {
                                    quote: "Finally, a platform that understands both the recruiter and the candidate experience. The interface is clean, modern, and fast.",
                                    author: "Elena Rodriguez",
                                    role: "Recruiting Ops, BigCorp",
                                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
                                }
                            ].map((testimonial, i) => (
                                <div key={i} className="flex flex-col rounded-xl bg-background p-8 shadow-sm">
                                    <div className="mb-4 flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                                    </div>
                                    <p className="mb-6 flex-1 text-muted-foreground italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <img src={testimonial.image} alt={testimonial.author} className="h-10 w-10 rounded-full object-cover" />
                                        <div>
                                            <div className="font-semibold">{testimonial.author}</div>
                                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-primary py-24 text-primary-foreground">
                    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-6 text-4xl font-bold">Ready to transform your HR?</h2>
                        <p className="mb-10 text-xl text-primary-foreground/80">Join thousands of companies building better teams with TalentFlow HR. Start your 14-day free trial today.</p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg" variant="secondary" className="px-8 text-primary font-bold">Get Started For Free</Button>
                            <Button size="lg" className="px-8 bg-transparent border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">Schedule a Demo</Button>
                        </div>
                        <p className="mt-6 text-sm opacity-60">No credit card required. Cancel anytime.</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-gray-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    TF
                                </div>
                                TalentFlow HR
                            </div>
                            <p className="text-sm text-muted-foreground max-w-xs mb-6">
                                The all-in-one platform for modern HR teams. We help you find, hire, and grow the best talent in the world.
                            </p>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-gray-200" />
                                <div className="h-8 w-8 rounded-full bg-gray-200" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Recruiting</li>
                                <li>Onboarding</li>
                                <li>Performance</li>
                                <li>Analytics</li>
                                <li>Pricing</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Blog</li>
                                <li>E-books</li>
                                <li>Webinars</li>
                                <li>Help Center</li>
                                <li>API Docs</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>About Us</li>
                                <li>Careers</li>
                                <li>Contact</li>
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row">
                        <p>&copy; 2026 TalentFlow HR Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span>GDPR Compliant</span>
                            <span>SOC2 Certified</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
