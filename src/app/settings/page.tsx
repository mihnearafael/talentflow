import { getCompanies, getDepartments } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Building2, Users, MapPin, Settings, ArrowLeft } from "lucide-react";
import { CompanyDialog } from "@/components/forms/company-dialog";
import { DepartmentDialog } from "@/components/forms/department-dialog";

export default async function SettingsPage() {
    const companies = await getCompanies();
    const departments = await getDepartments();

    return (
        <div className="bg-background page-enter">

            <main className="container mx-auto py-8 px-4">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to dashboard
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <Settings className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Organization Settings</h1>
                        <p className="text-muted-foreground">Manage your companies and departments.</p>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Companies */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="p-6 flex items-center justify-between border-b">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                <h2 className="font-semibold">Companies</h2>
                            </div>
                            <CompanyDialog />
                        </div>
                        <div className="p-6">
                            {companies.length === 0 ? (
                                <div className="text-center py-8">
                                    <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-semibold mb-2">No companies yet</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Add your first company to get started.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {companies.map((company) => (
                                        <div key={company.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                    {company.name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{company.name}</div>
                                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                        {company.industry && <span>{company.industry}</span>}
                                                        {company.location && (
                                                            <>
                                                                <span>•</span>
                                                                <MapPin className="h-3 w-3" />
                                                                <span>{company.location}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <CompanyDialog company={company} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Departments */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="p-6 flex items-center justify-between border-b">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <h2 className="font-semibold">Departments</h2>
                            </div>
                            <DepartmentDialog companies={companies} />
                        </div>
                        <div className="p-6">
                            {departments.length === 0 ? (
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-semibold mb-2">No departments yet</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Create departments to organize your teams.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {departments.map((department) => (
                                        <div key={department.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                            <div>
                                                <div className="font-medium">{department.name}</div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <Badge variant="outline">{department.company}</Badge>
                                                    {department.floorLocation && (
                                                        <span>Floor: {department.floorLocation}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <DepartmentDialog companies={companies} department={department} />
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
