import { CandidateHeader } from "@/components/candidate-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, CheckCircle2, BarChart3, Hourglass } from "lucide-react"

export default function AssessmentsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CandidateHeader />

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-1">Home / My Assessments</div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">My Assessments</h1>
                    <p className="text-muted-foreground">Manage your tests and view your performance history.</p>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3 mb-10">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Hourglass className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground">Pending Tests</span>
                        </div>
                        <div className="text-4xl font-bold">2</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium text-muted-foreground">Completed</span>
                        </div>
                        <div className="text-4xl font-bold">5</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-5 w-5 text-orange-500" />
                            <span className="text-sm font-medium text-muted-foreground">Average Score</span>
                        </div>
                        <div className="text-4xl font-bold">82%</div>
                    </div>
                </div>

                {/* Active Assessments */}
                <h2 className="text-xl font-bold mb-6">Active Assessments</h2>
                <div className="grid gap-6 lg:grid-cols-2 mb-12">
                    {/* Assessment 1 */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">Advanced Python Coding</h3>
                                <Badge variant="secondary" className="bg-red-50 text-red-600 border-none">Hard</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">Technical Assessment</p>

                            <div className="flex gap-6 text-sm mb-6">
                                <div className="flex items-center gap-2 text-orange-600 font-medium">
                                    <Calendar className="h-4 w-4" />
                                    Due: Tomorrow, 5:00 PM
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    60 mins
                                </div>
                            </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Assessment <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>

                    {/* Assessment 2 */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">Cognitive Aptitude</h3>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none">Medium</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">General Skills</p>

                            <div className="flex gap-6 text-sm mb-6">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Due: Oct 25, 2023
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    30 mins
                                </div>
                            </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Assessment <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </div>

                {/* Past Results */}
                <h2 className="text-xl font-bold mb-6">Past Results</h2>
                <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-muted-foreground font-medium uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Test Name</th>
                                    <th className="px-6 py-4">Date Completed</th>
                                    <th className="px-6 py-4">Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-foreground">Logical Reasoning</td>
                                    <td className="px-6 py-4 text-muted-foreground">Oct 10, 2023</td>
                                    <td className="px-6 py-4 font-bold">88/100</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 flex w-fit items-center gap-1 font-normal">
                                            <CheckCircle2 className="h-3 w-3" /> Passed
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">View Report <ArrowRight className="h-3 w-3" /></a>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-foreground">Cultural Fit Survey</td>
                                    <td className="px-6 py-4 text-muted-foreground">Oct 12, 2023</td>
                                    <td className="px-6 py-4 font-bold text-muted-foreground">N/A</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-100 flex w-fit items-center gap-1 font-normal">
                                            <Hourglass className="h-3 w-3" /> Review Pending
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-1">Details <ArrowRight className="h-3 w-3" /></a>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-foreground">React Fundamentals</td>
                                    <td className="px-6 py-4 text-muted-foreground">Sept 28, 2023</td>
                                    <td className="px-6 py-4 font-bold">92/100</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 flex w-fit items-center gap-1 font-normal">
                                            <CheckCircle2 className="h-3 w-3" /> Passed
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">View Report <ArrowRight className="h-3 w-3" /></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    )
}
