import { getAllApplications } from "@/actions/applications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "@/components/search-input"; // Will be useful later if expanded
import { ArrowLeft, FileText, Download } from "lucide-react";

export default async function ApplicationsPage() {
    const applications = await getAllApplications();

    return (
        <div className="bg-background page-enter min-h-screen">
            <main className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-2 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                        <p className="text-muted-foreground mt-1">Manage and review candidate applications.</p>
                    </div>
                </div>

                <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Candidate</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Applied For</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                            No applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map(({ application, candidate, job }) => (
                                        <tr key={application.id} className="border-b transition-colors hover:bg-muted/50 last:border-0">
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground">{candidate?.firstName} {candidate?.lastName}</span>
                                                    <span className="text-xs text-muted-foreground">{candidate?.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{job?.jobTitle}</span>
                                                    <span className="text-xs text-muted-foreground">Ref: {job?.id.slice(0, 8)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {new Date(application.applicationDate).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={
                                                    application.status === 'APPLIED' ? 'secondary' :
                                                        application.status === 'INTERVIEW' ? 'default' :
                                                            application.status === 'OFFER' ? 'outline' : 'secondary'
                                                } className="font-medium">
                                                    {application.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <Button variant="ghost" size="sm">
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
