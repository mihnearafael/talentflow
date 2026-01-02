import { getEmployeeById, getPromotionHistory, getReviewsForEmployee } from "@/actions/employees";
import { getContractsForEmployee } from "@/actions/contracts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, Calendar, DollarSign, TrendingUp, Star, FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const employee = await getEmployeeById(id);
    const promotions = await getPromotionHistory(id);
    const contracts = await getContractsForEmployee(id);
    const reviews = await getReviewsForEmployee(id);

    if (!employee) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
                            TF
                        </div>
                        TalentFlow
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/employees">
                            <Button variant="ghost">Employees</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                <Link href="/employees" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to directory
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Card */}
                        <div className="rounded-xl border bg-card p-8">
                            <div className="flex items-start gap-6">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                                    {employee.firstName?.[0]}{employee.lastName?.[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h1 className="text-2xl font-bold">{employee.firstName} {employee.lastName}</h1>
                                            <p className="text-lg text-muted-foreground">{employee.jobTitle}</p>
                                        </div>
                                        <Button>Edit Profile</Button>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {employee.email}
                                        </div>
                                        {employee.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                {employee.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />
                                            {employee.department} • {employee.company}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Hired {employee.hireDate}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            ${Number(employee.salary).toLocaleString()}/year
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Promotion History */}
                        <div className="rounded-xl border bg-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Career Timeline
                                </h2>
                                <Button variant="outline" size="sm">Promote</Button>
                            </div>

                            {promotions.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No promotions recorded yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {promotions.map((promo) => (
                                        <div key={promo.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{promo.oldTitle} → {promo.newTitle}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Salary: ${Number(promo.oldSalary).toLocaleString()} → ${Number(promo.newSalary).toLocaleString()}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">{promo.promotionDate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Performance Reviews */}
                        <div className="rounded-xl border bg-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Star className="h-5 w-5" />
                                    Performance Reviews
                                </h2>
                                <Button variant="outline" size="sm">Add Review</Button>
                            </div>

                            {reviews.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No reviews recorded yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((item) => (
                                        <div key={item.review.id} className="p-4 rounded-lg bg-muted/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-medium">
                                                    Reviewed by {item.reviewer?.firstName} {item.reviewer?.lastName}
                                                </div>
                                                <Badge variant="outline">
                                                    Rating: {item.review.rating}/5
                                                </Badge>
                                            </div>
                                            {item.review.comments && (
                                                <p className="text-sm text-muted-foreground">{item.review.comments}</p>
                                            )}
                                            <div className="text-xs text-muted-foreground mt-2">{item.review.reviewDate}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Contract
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    Record Promotion
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Star className="mr-2 h-4 w-4" />
                                    Add Review
                                </Button>
                            </div>
                        </div>

                        {/* Contracts */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="font-bold mb-4">Contracts</h3>
                            {contracts.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No contracts on file.</p>
                            ) : (
                                <div className="space-y-3">
                                    {contracts.map((contract) => (
                                        <div key={contract.id} className="p-3 rounded-lg bg-muted/50">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="secondary">{contract.contractType?.replace('_', ' ')}</Badge>
                                                <span className="text-xs text-muted-foreground">{contract.startDate}</span>
                                            </div>
                                            <div className="text-sm mt-2">
                                                ${Number(contract.baseSalary).toLocaleString()}/year
                                            </div>
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
