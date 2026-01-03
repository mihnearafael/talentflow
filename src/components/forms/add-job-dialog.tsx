'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createJob } from '@/actions/jobs'
import { Loader2, Plus } from 'lucide-react'

interface AddJobDialogProps {
    departments: { id: string; name: string }[]
}

export function AddJobDialog({ departments }: AddJobDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [departmentId, setDepartmentId] = useState('')
    const [employmentType, setEmploymentType] = useState<'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN'>('FULL_TIME')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        await createJob({
            departmentId,
            jobTitle: formData.get('jobTitle') as string,
            description: formData.get('description') as string,
            employmentType,
            salaryRangeMinimum: formData.get('salaryMin') as string,
            salaryRangeMaximum: formData.get('salaryMax') as string,
            closingDate: formData.get('closingDate') as string,
        })

        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post Job
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <DialogDescription>Create a new job posting.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input id="jobTitle" name="jobTitle" required placeholder="Senior Software Engineer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Department *</Label>
                            <Select value={departmentId} onValueChange={setDepartmentId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Employment Type</Label>
                            <Select value={employmentType} onValueChange={(v: any) => setEmploymentType(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                                    <SelectItem value="CONTRACT">Contract</SelectItem>
                                    <SelectItem value="INTERN">Intern</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea id="description" name="description" required placeholder="Describe the role, responsibilities, and requirements..." rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin">Salary Min</Label>
                            <Input id="salaryMin" name="salaryMin" type="number" placeholder="80000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salaryMax">Salary Max</Label>
                            <Input id="salaryMax" name="salaryMax" type="number" placeholder="120000" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="closingDate">Closing Date</Label>
                        <Input id="closingDate" name="closingDate" type="date" />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading || !departmentId}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Post Job
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
