import { getAllReviews } from "@/actions/reviews";
import { getEmployees } from "@/actions/employees";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star, Calendar, User } from "lucide-react";
import { AddReviewDialog } from "@/components/forms/add-review-dialog";

export default async function ReviewsPage() {
    const reviews = await getAllReviews();
    const employees = await getEmployees();

    // Calculate stats
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.review.rating || 0), 0) / reviews.length).toFixed(1)
        : '0.0';

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
                        <Link href="/">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Link href="/employees">
                            <Button variant="ghost">Employees</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Performance Reviews</h1>
                        <p className="text-muted-foreground">Track and manage employee performance evaluations.</p>
                    </div>
                    <AddReviewDialog employees={employees} />
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Total Reviews</span>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{reviews.length}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Average Rating</span>
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        </div>
                        <div className="text-2xl font-bold">{avgRating} / 5</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Employees Reviewed</span>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">
                            {new Set(reviews.map(r => r.review.employeeId)).size}
                        </div>
                    </div>
                </div>

                {/* Reviews Table */}
                <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="font-semibold">All Reviews</h2>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="p-12 text-center">
                            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                            <p className="text-muted-foreground mb-4">Start by conducting your first performance review.</p>
                            <AddReviewDialog employees={employees} />
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr className="text-left text-sm">
                                    <th className="p-4 font-medium">Employee</th>
                                    <th className="p-4 font-medium">Title</th>
                                    <th className="p-4 font-medium">Rating</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Comments</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((item) => (
                                    <tr key={item.review.id} className="border-t hover:bg-muted/30">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                                                    {item.employee?.firstName?.[0]}{item.employee?.lastName?.[0]}
                                                </div>
                                                <span>{item.employee?.firstName} {item.employee?.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{item.employee?.jobTitle}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= (item.review.rating || 0)
                                                                ? 'text-yellow-500 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{item.review.reviewDate}</td>
                                        <td className="p-4 text-muted-foreground max-w-xs truncate">
                                            {item.review.comments || '—'}
                                        </td>
                                        <td className="p-4">
                                            <Link href={`/employees/${item.employee?.id}`}>
                                                <Button size="sm" variant="ghost">View Profile</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}
