import { getEmployees } from "@/actions/employees";
import { getCompanies, getDepartments } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, Search, Mail, Building2 } from "lucide-react";
import { AddEmployeeDialog } from "@/components/forms/add-employee-dialog";

export default async function EmployeesPage() {
    const employees = await getEmployees();
    const companies = await getCompanies();
    const departments = await getDepartments();

    return (
        <div className="bg-background page-enter">

            <main className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
                        <p className="text-muted-foreground">{employees.length} total employees</p>
                    </div>
                    <AddEmployeeDialog companies={companies} departments={departments} />
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Employee Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {employees.length === 0 ? (
                        <div className="col-span-full text-center py-16 border rounded-lg bg-muted/30">
                            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No employees found</h3>
                            <p className="text-muted-foreground mb-4">Get started by adding your first employee.</p>
                            <AddEmployeeDialog companies={companies} departments={departments} />
                        </div>
                    ) : (
                        employees.map((employee) => (
                            <Link key={employee.id} href={`/employees/${employee.id}`} className="block group">
                                <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                                            {employee.firstName?.[0]}{employee.lastName?.[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {employee.firstName} {employee.lastName}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate">{employee.jobTitle}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{employee.department || 'No Department'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{employee.email}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <Badge variant="secondary">{employee.company || 'Company'}</Badge>
                                        <span className="text-xs text-muted-foreground">Since {employee.hireDate}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
