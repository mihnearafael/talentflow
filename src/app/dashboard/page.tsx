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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
                            TF
                        </div>
                        TalentFlow
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Jobs
                        </Link>
                        <Link href="/employees" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Employees
                        </Link>
                        <Link href="/training" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Training
                        </Link>
                        <Link href="/reviews" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Reviews
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link href="/settings">
                            <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Quick Add
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's an overview of your HR operations.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Link href="/employees" className="block">
                        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{stats.employeesCount}</div>
                            <div className="text-sm text-muted-foreground">Total Employees</div>
                        </div>
                    </Link>

                    <Link href="/jobs" className="block">
                        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-green-600" />
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{jobs.length}</div>
                            <div className="text-sm text-muted-foreground">Open Positions</div>
                        </div>
                    </Link>

                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{applications.length}</div>
                        <div className="text-sm text-muted-foreground">Applications</div>
                    </div>

                    <Link href="/training" className="block">
                        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-orange-600" />
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{trainingPrograms.length}</div>
                            <div className="text-sm text-muted-foreground">Training Programs</div>
                        </div>
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Recent Applications */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="p-6 flex items-center justify-between border-b">
                            <h2 className="font-semibold">Recent Applications</h2>
                            <Link href="/applications">
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentApplications.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No applications yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentApplications.map((item) => (
                                        <div key={item.application.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                                                    {item.candidate?.firstName?.[0]}{item.candidate?.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {item.candidate?.firstName} {item.candidate?.lastName}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">{item.job?.jobTitle}</div>
                                                </div>
                                            </div>
                                            <Badge variant={
                                                item.application.status === 'APPLIED' ? 'secondary' :
                                                    item.application.status === 'INTERVIEW' ? 'default' :
                                                        item.application.status === 'OFFER' ? 'outline' : 'secondary'
                                            }>
                                                {item.application.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Employees */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="p-6 flex items-center justify-between border-b">
                            <h2 className="font-semibold">Team Members</h2>
                            <Link href="/employees">
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentEmployees.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No employees yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentEmployees.map((employee) => (
                                        <div key={employee.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                                                    {employee.firstName?.[0]}{employee.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{employee.jobTitle}</div>
                                                </div>
                                            </div>
                                            <Badge variant="outline">{employee.department || 'No Dept'}</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border bg-card shadow-sm lg:col-span-2">
                        <div className="p-6 border-b">
                            <h2 className="font-semibold">Quick Actions</h2>
                        </div>
                        <div className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            <Link href="/jobs">
                                <Button variant="outline" className="w-full h-auto py-6 flex-col">
                                    <Briefcase className="h-6 w-6 mb-2" />
                                    <span>Post a Job</span>
                                </Button>
                            </Link>
                            <Link href="/employees">
                                <Button variant="outline" className="w-full h-auto py-6 flex-col">
                                    <Users className="h-6 w-6 mb-2" />
                                    <span>Add Employee</span>
                                </Button>
                            </Link>
                            <Link href="/training">
                                <Button variant="outline" className="w-full h-auto py-6 flex-col">
                                    <BookOpen className="h-6 w-6 mb-2" />
                                    <span>Create Training</span>
                                </Button>
                            </Link>
                            <Link href="/reviews">
                                <Button variant="outline" className="w-full h-auto py-6 flex-col">
                                    <TrendingUp className="h-6 w-6 mb-2" />
                                    <span>New Review</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
