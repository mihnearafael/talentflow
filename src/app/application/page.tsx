import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, Plus, HelpCircle, FileText, ChevronRight, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function ApplicationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6 shadow-sm justify-between">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        TF
                    </div>
                    TalentFlow HR
                </div>

                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden ml-2">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" alt="User" />
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto max-w-5xl px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Personal Info</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-semibold text-primary">Experience & Resume</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>Review</span>
                </div>

                {/* Profile Header Card */}
                <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" alt="Alex Morgan" className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                            <h1 className="text-2xl font-bold">Alex Morgan</h1>
                            <p className="text-muted-foreground">Senior Product Designer Application</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-primary">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        In Progress
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Resume & Qualifications</h2>
                            <p className="text-muted-foreground mb-6">Upload your CV and tell us about your educational background. We'll use this to match you with the best opportunities.</p>

                            <div className="mb-6 rounded-lg border bg-blue-50/50 p-4 border-blue-100 flex gap-3 text-sm text-blue-800">
                                <div className="mt-0.5">✨</div>
                                <p><span className="font-semibold">Tip:</span> Uploading your resume first will help us auto-fill your education and experience details below.</p>
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-semibold">Resume Upload</h3>
                                <Badge variant="secondary" className="text-xs">PDF, DOCX up to 5MB</Badge>
                            </div>

                            <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer border-gray-300">
                                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-primary">
                                    <UploadCloud className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-primary mb-1">Click to upload <span className="text-muted-foreground font-normal">or drag and drop</span></p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold flex items-center gap-2">Education History</h3>
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">
                                    <Plus className="h-4 w-4 mr-1" /> Add Education
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-sidebar-accent transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Master of Design</h4>
                                        <div className="text-sm text-muted-foreground">Royal College of Art</div>
                                        <div className="text-xs text-muted-foreground mt-1">2018 - 2020 • London, UK</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-sidebar-accent transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Bachelor of Fine Arts</h4>
                                        <div className="text-sm text-muted-foreground">Rhode Island School of Design</div>
                                        <div className="text-xs text-muted-foreground mt-1">2014 - 2018 • Providence, RI</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                            <h3 className="font-bold">Experience Overview</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Primary Skillset</label>
                                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option>Product Design</option>
                                    <option>Frontend Development</option>
                                    <option>Marketing</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium">Years of Experience</label>
                                    <span className="text-sm font-bold border rounded px-2 py-0.5">5</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full w-1/2 relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-primary rounded-full border-2 border-white shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground pt-1">
                                    <span>Entry</span>
                                    <span>Senior</span>
                                    <span>Expert</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Design Portfolio URL</label>
                                <div className="flex rounded-md shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                    <span className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">https://</span>
                                    <input className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none" placeholder="www.example.com" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-blue-50/50 p-6 border-blue-100">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-blue-100 p-2 text-primary">
                                    <HelpCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Need help with your resume?</h4>
                                    <p className="text-xs text-muted-foreground mb-3">Check out our guide on how to format your resume for the best parsing results.</p>
                                    <button className="text-xs font-bold text-primary hover:underline">Read Guide</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-end gap-4 border-t pt-6">
                    <Button variant="outline" size="lg">Back</Button>
                    <Button size="lg" className="px-8">Save & Continue <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
            </main>
        </div>
    )
}
