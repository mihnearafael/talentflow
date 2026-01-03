import { getEmployees } from "@/actions/employees";
import { getTrainingPrograms } from "@/actions/training";
import { getJobs } from "@/actions/jobs";
import { getAllApplications } from "@/actions/applications";
import { getDashboardStats } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Users,
    BookOpen,
    Briefcase,
    FileText,
    TrendingUp,
    Building2,
    ArrowRight,
    Plus,
    Settings
} from "lucide-react";

export default async function DashboardPage() {
    const employees = await getEmployees();
    const trainingPrograms = await getTrainingPrograms();
    const jobs = await getJobs();
    const applications = await getAllApplications();
    const stats = await getDashboardStats();

    const recentApplications = applications.slice(0, 5);
    const recentEmployees = employees.slice(0, 5);

    return (
        <div className="bg-background page-enter">
            <main className="container mx-auto py-8 px-4">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">👋 HR Dashboard</h1>
                    <p className="text-lg text-muted-foreground mt-2">Welcome back! Here's an overview of your HR operations.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Link href="/employees" className="block group">
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-3xl font-bold text-foreground">{stats.employeesCount}</div>
                            <div className="text-sm text-muted-foreground font-medium">Total Employees</div>
                        </div>
                    </Link>

                    <Link href="/jobs" className="block group">
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-inner">
                                    <Briefcase className="h-6 w-6 text-green-600" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-3xl font-bold text-foreground">{jobs.length}</div>
                            <div className="text-sm text-muted-foreground font-medium">Open Positions</div>
                        </div>
                    </Link>

                    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center shadow-inner">
                                <FileText className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground">{applications.length}</div>
                        <div className="text-sm text-muted-foreground font-medium">Applications</div>
                    </div>

                    <Link href="/training" className="block group">
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center shadow-inner">
                                    <BookOpen className="h-6 w-6 text-orange-600" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-3xl font-bold text-foreground">{trainingPrograms.length}</div>
                            <div className="text-sm text-muted-foreground font-medium">Training Programs</div>
                        </div>
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Recent Applications */}
                    <div className="rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6 flex items-center justify-between border-b border-border/50">
                            <h2 className="font-bold text-lg">Recent Applications</h2>
                            <Link href="/applications">
                                <Button variant="ghost" size="sm" className="hover:bg-muted text-muted-foreground hover:text-foreground">View All</Button>
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentApplications.length === 0 ? (
                                <p className="text-muted-foreground text-sm text-center py-4">No applications yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentApplications.map((item) => (
                                        <div key={item.application.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                                                    {item.candidate?.firstName?.[0]}{item.candidate?.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">
                                                        {item.candidate?.firstName} {item.candidate?.lastName}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">{item.job?.jobTitle}</div>
                                                </div>
                                            </div>
                                            <Badge variant={
                                                item.application.status === 'APPLIED' ? 'secondary' :
                                                    item.application.status === 'INTERVIEW' ? 'default' :
                                                        item.application.status === 'OFFER' ? 'outline' : 'secondary'
                                            } className="font-medium">
                                                {item.application.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Employees */}
                    <div className="rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6 flex items-center justify-between border-b border-border/50">
                            <h2 className="font-bold text-lg">Team Members</h2>
                            <Link href="/employees">
                                <Button variant="ghost" size="sm" className="hover:bg-muted text-muted-foreground hover:text-foreground">View All</Button>
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentEmployees.length === 0 ? (
                                <p className="text-muted-foreground text-sm text-center py-4">No employees yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentEmployees.map((employee) => (
                                        <div key={employee.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                                                    {employee.firstName?.[0]}{employee.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{employee.firstName} {employee.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{employee.jobTitle}</div>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">{employee.department || 'No Dept'}</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
