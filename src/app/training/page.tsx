import { getTrainingPrograms, getAllEnrollments } from "@/actions/training";
import { getDepartments } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, Clock, BarChart3, Users } from "lucide-react";
import { AddTrainingDialog } from "@/components/forms/add-training-dialog";

export default async function TrainingPage() {
    const programs = await getTrainingPrograms();
    const enrollments = await getAllEnrollments();
    const departments = await getDepartments();

    const activeEnrollments = enrollments.filter(e => e.enrollment.status !== 'COMPLETED');
    const completedEnrollments = enrollments.filter(e => e.enrollment.status === 'COMPLETED');

    return (
        <div className="bg-background animate-in fade-in slide-in-from-bottom-4 duration-500">

            <main className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Learning & Development</h1>
                        <p className="text-muted-foreground">Manage training programs and track employee development.</p>
                    </div>
                    <AddTrainingDialog departments={departments} />
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Total Programs</span>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{programs.length}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Active Enrollments</span>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{activeEnrollments.length}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Completed</span>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{completedEnrollments.length}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Completion Rate</span>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">
                            {enrollments.length > 0
                                ? Math.round((completedEnrollments.length / enrollments.length) * 100)
                                : 0}%
                        </div>
                    </div>
                </div>

                {/* Training Catalog */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Training Catalog</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {programs.length === 0 ? (
                            <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No training programs</h3>
                                <p className="text-muted-foreground mb-4">Create your first training program to get started.</p>
                                <AddTrainingDialog departments={departments} />
                            </div>
                        ) : (
                            programs.map((program) => (
                                <div key={program.id} className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                        </div>
                                        <Badge variant="outline">
                                            {program.difficultyLevel || 'All Levels'}
                                        </Badge>
                                    </div>

                                    <h3 className="font-bold text-lg mb-2">{program.programName}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {program.description || 'No description available.'}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {program.durationHours || '?'} hours
                                        </div>
                                        <Badge variant="secondary">{program.department || 'General'}</Badge>
                                    </div>

                                    <Button variant="outline" className="w-full mt-4">
                                        Enroll Employees
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Active Enrollments */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Active Enrollments</h2>
                    <div className="rounded-xl border bg-card overflow-hidden">
                        {activeEnrollments.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No active enrollments at the moment.
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr className="text-left text-sm">
                                        <th className="p-4 font-medium">Employee</th>
                                        <th className="p-4 font-medium">Program</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium">Enrolled</th>
                                        <th className="p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeEnrollments.map((item) => (
                                        <tr key={item.enrollment.id} className="border-t">
                                            <td className="p-4">
                                                {item.employee?.firstName} {item.employee?.lastName}
                                            </td>
                                            <td className="p-4">{item.program?.programName}</td>
                                            <td className="p-4">
                                                <Badge variant={item.enrollment.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
                                                    {item.enrollment.status?.replace('_', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{item.enrollment.enrollmentDate}</td>
                                            <td className="p-4">
                                                <Button size="sm" variant="outline">Mark Complete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
