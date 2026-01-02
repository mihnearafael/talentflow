import { CandidateHeader } from "@/components/candidate-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, ChevronLeft, ChevronRight, X } from "lucide-react"

export default function InterviewPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CandidateHeader />

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="text-sm text-muted-foreground mb-1">Home / Interview Schedule</div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Interview Schedule</h1>
                    <p className="text-muted-foreground">Manage your upcoming interview sessions, join meetings, and view scheduling history.</p>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="text-sm text-muted-foreground mb-2">Total Scheduled</div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <span className="text-3xl font-bold">5</span>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="text-sm text-muted-foreground mb-2">Completed</div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                            <span className="text-3xl font-bold">2</span>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="text-sm text-muted-foreground mb-2">Pending</div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 text-orange-500">⏳</div>
                            <span className="text-3xl font-bold">3</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Simple Calendar Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                                <span className="font-bold">October 2023</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-2">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {/* Placeholder days */}
                                {[...Array(31)].map((_, i) => (
                                    <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 ${i === 4 ? 'bg-primary text-white hover:bg-primary' : ''} ${i === 23 ? 'bg-blue-100 text-blue-700' : ''}`}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border bg-blue-50/50 p-4 border-blue-100">
                            <div className="flex gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">i</div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Timezone Notice</h4>
                                    <p className="text-xs text-muted-foreground">All times are displayed in your local timezone: <strong>America/New_York (EST)</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule List */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-xl font-bold">Upcoming Interviews</h2>

                        {/* Card 1 */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none uppercase text-[10px] tracking-wider font-bold">Confirmed</Badge>
                                <span className="text-sm text-muted-foreground">Video Call</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="flex-shrink-0 h-20 w-20 rounded-xl bg-blue-50 flex flex-col items-center justify-center text-blue-600 border border-blue-100">
                                    <span className="text-xs font-bold uppercase">OCT</span>
                                    <span className="text-3xl font-bold">24</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2">Senior Backend Engineer - Technical Round</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> 2:00 PM - 3:00 PM EST</div>
                                        <div className="flex items-center gap-1"><Video className="h-4 w-4" /> Zoom Meeting</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" alt="Sarah" className="h-8 w-8 rounded-full object-cover" />
                                        <div className="text-sm">
                                            <div className="font-semibold">Sarah Jenkins</div>
                                            <div className="text-xs text-muted-foreground">CTO at TalentFlow</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-center">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Join Meeting ↗</Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground h-8">Reschedule</Button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm opacity-90">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none uppercase text-[10px] tracking-wider font-bold">Pending Confirmation</Badge>
                                <span className="text-sm text-muted-foreground">System Design</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 h-20 w-20 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-gray-500 border">
                                    <span className="text-xs font-bold uppercase">OCT</span>
                                    <span className="text-3xl font-bold">27</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2">Culture Fit & Leadership Principles</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> 10:00 AM - 11:00 AM EST</div>
                                        <div className="flex items-center gap-1"><Video className="h-4 w-4" /> Google Meet</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">MD</div>
                                        <div className="text-sm">
                                            <div className="font-semibold">Mark Doe</div>
                                            <div className="text-xs text-muted-foreground">VP of Engineering</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-center">
                                    <Button disabled className="w-full bg-gray-100 text-gray-400">Join Meeting</Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground h-8 flex items-center gap-1"><X className="h-3 w-3" /> Cancel Request</Button>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold pt-4">Past Interviews</h2>
                        <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                                <span className="text-[10px] font-bold uppercase">OCT</span>
                                <span className="text-2xl font-bold">12</span>
                            </div>
                            <div className="flex-1">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none uppercase text-[10px] tracking-wider font-bold mb-1">Completed</Badge>
                                <h3 className="font-bold">Initial HR Screening</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div>11:30 AM - 12:00 PM EST</div>
                                    <div>Jessica Lee (Recruiter)</div>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">View Details ›</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
