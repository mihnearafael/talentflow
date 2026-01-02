import { Button } from "@/components/ui/button"
import { Check, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center bg-background px-8 py-12 lg:w-1/2 xl:px-24">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
                        <p className="text-muted-foreground">Enter your details to access your candidate portal.</p>
                    </div>

                    <div className="flex w-full rounded-md bg-gray-100 p-1">
                        <button className="w-1/2 rounded-sm bg-white py-2 text-sm font-medium shadow-sm transition-all text-foreground">Log In</button>
                        <button className="w-1/2 rounded-sm py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Sign Up</button>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Work Email
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                                    id="email"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    type="password"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 font-mono"
                                    id="password"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <Link href="/dashboard" className="w-full">
                            <Button className="w-full" size="lg">Sign In</Button>
                        </Link>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full flex gap-2">
                            <svg role="img" viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                            Google
                        </Button>
                        <Button variant="outline" className="w-full flex gap-2">
                            <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-[#0077b5]" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.202 22 24 21.227 24 20.271V1.729C24 .774 23.202 0 22.225 0z" /></svg>
                            LinkedIn
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Secure SSL Connection
                    </div>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary">
                        TF
                    </div>
                    TalentFlow HR
                </div>

                <div className="space-y-8">
                    <h2 className="text-4xl font-bold leading-tight">
                        Unlock your next<br /> career move.
                    </h2>
                    <p className="max-w-md text-lg text-primary-foreground/80">
                        Join 10,000+ professionals who have accelerated their growth with TalentFlow.
                    </p>

                    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
                        <div className="flex gap-1 mb-4 text-yellow-400">
                            {[1, 2, 3, 4, 5].map(s => <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>)}
                        </div>
                        <p className="mb-6 italic text-sm">"TalentFlow made my job search incredibly seamless. I found my dream role within 2 weeks of creating my profile."</p>
                        <div className="flex items-center gap-4">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" alt="Sarah J" className="h-10 w-10 rounded-full object-cover border-2 border-white/20" />
                            <div>
                                <div className="font-semibold text-sm">Sarah Jenkins</div>
                                <div className="text-xs opacity-70">Product Designer @ TechCorp</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 text-sm opacity-60">
                    <a href="#" className="hover:opacity-100">Privacy Policy</a>
                    <a href="#" className="hover:opacity-100">Terms of Service</a>
                </div>
            </div>
        </div>
    )
}
