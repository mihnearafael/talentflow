'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyForJob } from "@/actions/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle, Loader2 } from "lucide-react";

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const { id } = await params;

        try {
            await applyForJob(id, {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                email: formData.get('email') as string,
                phoneNumber: formData.get('phone') as string,
                resumeUrl: formData.get('resumeUrl') as string,
                coverLetterUrl: formData.get('coverLetterUrl') as string,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for applying. We'll review your application and get back to you within 48 hours.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/jobs">
                            <Button variant="outline">Browse More Jobs</Button>
                        </Link>
                        <Link href="/">
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
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
                </div>
            </header>

            <main className="container mx-auto py-8 px-4 max-w-2xl">
                <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to jobs
                </Link>

                <div className="rounded-xl border bg-card p-8">
                    <h1 className="text-2xl font-bold mb-2">Apply for this Position</h1>
                    <p className="text-muted-foreground mb-8">Fill out the form below to submit your application.</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Resume */}
                        <div>
                            <label htmlFor="resumeUrl" className="block text-sm font-medium mb-2">
                                Resume URL *
                            </label>
                            <input
                                type="url"
                                id="resumeUrl"
                                name="resumeUrl"
                                required
                                placeholder="https://drive.google.com/..."
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Paste a link to your resume (Google Drive, Dropbox, etc.)
                            </p>
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <label htmlFor="coverLetterUrl" className="block text-sm font-medium mb-2">
                                Cover Letter URL (Optional)
                            </label>
                            <input
                                type="url"
                                id="coverLetterUrl"
                                name="coverLetterUrl"
                                placeholder="https://..."
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
