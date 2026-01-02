import { getJobById, getJobSkills } from "@/actions/jobs";
import { applyForJob } from "@/actions/applications";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Building2, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = await getJobById(id);
    const skills = await getJobSkills(id);

    if (!job) {
        notFound();
    }

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
                    <nav className="flex items-center gap-4">
                        <Link href="/jobs">
                            <Button variant="ghost">Browse Jobs</Button>
                        </Link>
                        <Link href="/login">
                            <Button>Log In</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                {/* Back Link */}
                <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to all jobs
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Header */}
                        <div className="rounded-xl border bg-card p-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                    {job.department || 'General'}
                                </Badge>
                                <Badge variant="secondary">{job.type?.replace('_', ' ')}</Badge>
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    Actively Hiring
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    <span>{job.company}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    <span>{job.location || 'Remote'}</span>
                                </div>
                                {(job.salaryMin || job.salaryMax) && (
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        <span>
                                            {job.salaryMin && job.salaryMax
                                                ? `$${Number(job.salaryMin).toLocaleString()} - $${Number(job.salaryMax).toLocaleString()}`
                                                : 'Competitive'}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    <span>Posted {job.posted}</span>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="rounded-xl border bg-card p-8">
                            <h2 className="text-xl font-bold mb-4">About This Role</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {job.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>

                        {/* Required Skills */}
                        {skills.length > 0 && (
                            <div className="rounded-xl border bg-card p-8">
                                <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill.skillId} variant="secondary" className="px-3 py-1">
                                            {skill.skillName}
                                            {skill.requiredLevel && (
                                                <span className="ml-2 text-xs opacity-60">Lvl {skill.requiredLevel}</span>
                                            )}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Card */}
                        <div className="rounded-xl border bg-card p-6 sticky top-6">
                            <h3 className="font-bold text-lg mb-4">Interested in this role?</h3>
                            <Link href={`/jobs/${id}/apply`}>
                                <Button className="w-full mb-4" size="lg">
                                    Apply Now
                                </Button>
                            </Link>
                            <p className="text-xs text-muted-foreground text-center">
                                By applying, you agree to our terms and privacy policy.
                            </p>

                            <div className="border-t mt-6 pt-6">
                                <h4 className="font-medium mb-3">What to expect:</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        Application review within 48 hours
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        Initial screening call
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        Technical assessment
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        Final interview with team
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Company Card */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="font-bold text-lg mb-4">About the Company</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                    {job.company?.[0] || 'C'}
                                </div>
                                <div>
                                    <div className="font-medium">{job.company}</div>
                                    <div className="text-sm text-muted-foreground">{job.location}</div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">View Company Profile</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
