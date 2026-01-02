import { CandidateHeader } from "@/components/candidate-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, MoreHorizontal, Video, Briefcase, Plus } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CandidateHeader />

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Alex</h1>
                    <p className="text-muted-foreground">Here is the status of your job applications and upcoming events.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Total Applications</span>
                            <Briefcase className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="text-4xl font-bold">12</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">In Progress</span>
                            <MoreHorizontal className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="text-4xl font-bold">5</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Offers</span>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="text-4xl font-bold">1</div>
                    </div>
                </div>

                {/* Next Up */}
                <h2 className="text-xl font-bold mb-4">Next Up</h2>
                <div className="rounded-xl border bg-card p-6 shadow-sm mb-12 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            <Clock className="mr-1 h-3 w-3" /> Tomorrow, 2:00 PM
                        </Badge>
                        <div>
                            <h3 className="text-xl font-bold">Technical Interview</h3>
                            <p className="text-sm text-muted-foreground">Engineering Team • Senior Frontend Developer Role</p>
                        </div>
                        <p className="text-muted-foreground bg-gray-50 p-3 rounded-lg text-sm border">
                            Prepare for a 60-minute coding session focusing on React patterns and system design. Make sure your environment is ready.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Button className="bg-blue-600 hover:bg-blue-700">Join Meeting</Button>
                            <Button variant="secondary">View Details</Button>
                        </div>
                    </div>
                    <div className="w-full md:w-80 h-48 rounded-lg bg-slate-800 relative overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm font-medium">
                            <Video className="h-4 w-4" />
                            Google Meet
                        </div>
                        <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80" alt="Plant" className="absolute bottom-0 right-0 h-32 w-32 object-contain opacity-80" />
                    </div>
                </div>

                {/* Applications */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Your Applications</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">Status: All</Button>
                        <Button variant="outline" size="sm" className="h-8">Sort by: Date</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Application 1 */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                    S
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Senior Product Designer</h3>
                                    <div className="text-sm text-muted-foreground">Stripe • Design Systems Team</div>
                                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                        <Briefcase className="h-3 w-3" /> San Francisco (Hybrid) • Applied Oct 12, 2023
                                    </div>
                                </div>
                            </div>
                            <Button variant="secondary">View Details</Button>
                        </div>

                        <div className="relative">
                            <div className="absolute top-2.5 left-0 w-full h-0.5 bg-gray-100" />
                            <div className="relative z-10 grid grid-cols-4 text-center">
                                {[
                                    { label: "Submitted", status: "completed" },
                                    { label: "Screening", status: "active" },
                                    { label: "Interview", status: "pending" },
                                    { label: "Offer", status: "pending" }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 bg-white ${step.status === 'completed' ? 'border-primary bg-primary text-white' :
                                                step.status === 'active' ? 'border-primary text-primary' : 'border-gray-200 text-gray-300'
                                            }`}>
                                            {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                                                step.status === 'active' ? <div className="h-2 w-2 rounded-full bg-primary" /> :
                                                    <Circle className="h-4 w-4" />}
                                        </div>
                                        <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-2 rounded-md bg-blue-50 p-2 text-xs text-blue-700 w-fit">
                            <div className="font-bold">In Progress</div>
                            <span>Next Step: Awaiting feedback from Hiring Manager.</span>
                        </div>
                    </div>

                    {/* Application 2 - Details collapsed by default, simpler view in design */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold">
                                    A
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">UX Researcher</h3>
                                    <div className="text-sm text-muted-foreground">Airbnb • Experience Team</div>
                                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                        <Briefcase className="h-3 w-3" /> Remote • Applied Sep 28, 2023
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700">Review Offer</Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold">Offer Received</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 rounded-md bg-green-50 p-2 text-xs text-green-700 w-fit">
                            <div className="font-bold">Action Required</div>
                            <span>Offer expires in 3 days.</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4 text-muted-foreground">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">Looking for more opportunities?</h3>
                    <p className="text-muted-foreground mb-4">Browse our job board to find your next challenge.</p>
                    <Button size="lg" className="px-8">Explore New Roles</Button>
                </div>

            </main>
        </div>
    )
}
