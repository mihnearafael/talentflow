import { getJobs } from "@/actions/jobs";
import { getDepartments } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, Clock, Search } from "lucide-react";
import { AddJobDialog } from "@/components/forms/add-job-dialog";

export default async function JobsPage() {
    const jobs = await getJobs();
    const departments = await getDepartments();

    return (
        <div className="bg-background animate-in fade-in slide-in-from-bottom-4 duration-500">

            <main className="container mx-auto py-12 px-4">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Open Positions</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        Browse open positions. Your dream job is just a click away.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search jobs by title, skill, or company..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>
                        <Button className="shadow-sm">Search</Button>
                        <AddJobDialog departments={departments} />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-12 text-center">
                    <div>
                        <div className="text-3xl font-bold text-primary">{jobs.length}</div>
                        <div className="text-sm text-muted-foreground">Open Positions</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">50+</div>
                        <div className="text-sm text-muted-foreground">Companies Hiring</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary">1,200+</div>
                        <div className="text-sm text-muted-foreground">Candidates Placed</div>
                    </div>
                </div>

                {/* Job Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.length === 0 ? (
                        <div className="col-span-full text-center py-16 border rounded-lg bg-muted/30">
                            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No open positions</h3>
                            <p className="text-muted-foreground mb-4">Check back soon for new opportunities!</p>
                            <AddJobDialog departments={departments} />
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <Link key={job.id} href={`/jobs/${job.id}`} className="block group">
                                <div className="h-full rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
                                    <div className="mb-4 flex items-start justify-between">
                                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                            {job.department || 'General'}
                                        </Badge>
                                        <Badge variant="secondary">{job.type?.replace('_', ' ')}</Badge>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>

                                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" />
                                            <span>{job.company || 'Company'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{job.location || 'Remote'}</span>
                                        </div>
                                        {(job.salaryMin || job.salaryMax) && (
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" />
                                                <span>
                                                    {job.salaryMin && job.salaryMax
                                                        ? `$${Number(job.salaryMin).toLocaleString()} - $${Number(job.salaryMax).toLocaleString()}`
                                                        : job.salaryMin
                                                            ? `From $${Number(job.salaryMin).toLocaleString()}`
                                                            : `Up to $${Number(job.salaryMax).toLocaleString()}`}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>Posted {job.posted}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full">View Details</Button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
