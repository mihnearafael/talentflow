import { CandidateHeader } from "@/components/candidate-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    LayoutGrid,
    Briefcase,
    CheckCircle2,
    GraduationCap,
    FileText,
    Plus,
    MoreVertical,
    Code,
    PenTool,
    Server,
    Zap
} from "lucide-react"

export default function SkillsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CandidateHeader />

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0 space-y-6">
                        {/* Profile Card */}
                        <div className="flex flex-col items-center p-6 bg-transparent">
                            <div className="relative mb-4">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" alt="Alex" className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-sm" />
                                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-2 border-white" />
                            </div>
                            <h2 className="text-xl font-bold">Alex Morgan</h2>
                            <div className="text-sm text-muted-foreground mb-3">ID: 88392</div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Open to Work</Badge>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-1">
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100 rounded-md">
                                <LayoutGrid className="h-5 w-5" /> Overview
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100 rounded-md">
                                <Briefcase className="h-5 w-5" /> Experience
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-primary bg-blue-50 rounded-md">
                                <CheckCircle2 className="h-5 w-5" /> Skills
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100 rounded-md">
                                <GraduationCap className="h-5 w-5" /> Education
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100 rounded-md">
                                <FileText className="h-5 w-5" /> Documents
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Your Skills</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                                <p className="text-muted-foreground max-w-2xl">Showcase your expertise to help recruiters match you with the perfect role. Keeping this up to date increases your visibility by 40%.</p>
                                <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" /> Add New Skill</Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl border bg-card p-6 shadow-sm relative">
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Skills</div>
                                <div className="text-4xl font-bold">14</div>
                                <LayoutGrid className="absolute top-6 right-6 h-5 w-5 text-blue-400" />
                            </div>
                            <div className="rounded-xl border bg-card p-6 shadow-sm relative">
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Expert Level</div>
                                <div className="text-4xl font-bold">5</div>
                                <CheckCircle2 className="absolute top-6 right-6 h-5 w-5 text-purple-400" />
                            </div>
                            <div className="rounded-xl border bg-card p-6 shadow-sm relative">
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Verified</div>
                                <div className="text-4xl font-bold">8</div>
                                <CheckCircle2 className="absolute top-6 right-6 h-5 w-5 text-green-400" />
                            </div>
                        </div>

                        {/* Filter / Search */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search your skills..."
                                    className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="default" className="bg-black text-white hover:bg-gray-800">All Skills</Button>
                                <Button variant="ghost">Technical</Button>
                                <Button variant="ghost">Soft Skills</Button>
                                <Button variant="ghost">Languages</Button>
                            </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Skill 1 */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Code className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">React.js</h3>
                                            <div className="text-xs text-muted-foreground">Front-end Development</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Expert</Badge>
                                    <Badge variant="outline" className="bg-gray-50">5 Years</Badge>
                                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50 gap-1"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-full bg-purple-600 rounded-full" />
                                </div>
                            </div>

                            {/* Skill 2 */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                            <PenTool className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">UI/UX Design</h3>
                                            <div className="text-xs text-muted-foreground">Design</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Advanced</Badge>
                                    <Badge variant="outline" className="bg-gray-50">4 Years</Badge>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-[70%] bg-blue-500 rounded-full" />
                                </div>
                            </div>

                            {/* Skill 3 */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                                            <div className="font-bold">CSS</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Tailwind CSS</h3>
                                            <div className="text-xs text-muted-foreground">Front-end Development</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Advanced</Badge>
                                    <Badge variant="outline" className="bg-gray-50">3 Years</Badge>
                                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50 gap-1"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-[80%] bg-blue-500 rounded-full" />
                                </div>
                            </div>

                            {/* Skill 4 */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                                            <PenTool className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Figma</h3>
                                            <div className="text-xs text-muted-foreground">Design Tools</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Expert</Badge>
                                    <Badge variant="outline" className="bg-gray-50">6 Years</Badge>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-full bg-purple-600 rounded-full" />
                                </div>
                            </div>

                            {/* Skill 5 */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                            <Server className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Node.js</h3>
                                            <div className="text-xs text-muted-foreground">Back-end Development</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Intermediate</Badge>
                                    <Badge variant="outline" className="bg-gray-50">2 Years</Badge>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-[40%] bg-yellow-500 rounded-full" />
                                </div>
                            </div>

                            {/* Add New */}
                            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 shadow-sm flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer min-h-[180px]">
                                <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-muted-foreground">
                                    <Plus className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-foreground">Add another skill</h3>
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="rounded-xl bg-blue-50/50 p-6 border border-blue-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                <h3 className="font-bold">Suggested for your profile</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                                <p>Based on your experience with <strong>React.js</strong> and <strong>Node.js</strong>, recruiters often look for these skills:</p>
                                <div className="flex gap-2 flex-wrap">
                                    <Button variant="outline" size="sm" className="bg-white"><Plus className="h-3 w-3 mr-1" /> TypeScript</Button>
                                    <Button variant="outline" size="sm" className="bg-white"><Plus className="h-3 w-3 mr-1" /> GraphQL</Button>
                                    <Button variant="outline" size="sm" className="bg-white"><Plus className="h-3 w-3 mr-1" /> Next.js</Button>
                                    <Button variant="outline" size="sm" className="bg-white"><Plus className="h-3 w-3 mr-1" /> PostgreSQL</Button>
                                    <Button variant="outline" size="sm" className="bg-white"><Plus className="h-3 w-3 mr-1" /> AWS</Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-sm">Profile Strength</h3>
                                <span className="font-bold text-blue-600 text-sm">85%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                                <div className="h-full w-[85%] bg-blue-600 rounded-full" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Add 2 more verified skills to reach All-Star status</p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
