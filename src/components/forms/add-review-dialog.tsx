'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createReview } from '@/actions/reviews'
import { Loader2, Plus, Star } from 'lucide-react'

interface AddReviewDialogProps {
    employees: { id: string; firstName: string | null; lastName: string | null; jobTitle: string | null }[]
    currentReviewerId?: string
}

export function AddReviewDialog({ employees, currentReviewerId }: AddReviewDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [employeeId, setEmployeeId] = useState('')
    const [rating, setRating] = useState(3)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        await createReview({
            employeeId,
            reviewerId: currentReviewerId || employeeId, // Self-review if no reviewer specified
            rating,
            comments: formData.get('comments') as string,
        })

        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Review
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Performance Review</DialogTitle>
                    <DialogDescription>Submit a performance review for an employee.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Employee *</Label>
                        <Select value={employeeId} onValueChange={setEmployeeId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employees.map((emp) => (
                                    <SelectItem key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName} - {emp.jobTitle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Rating *</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="p-1 hover:scale-110 transition-transform"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comments">Comments</Label>
                        <Textarea
                            id="comments"
                            name="comments"
                            placeholder="Provide detailed feedback on performance, achievements, and areas for improvement..."
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading || !employeeId}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
