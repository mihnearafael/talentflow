'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createDepartment, updateDepartment } from '@/actions/organizations'
import { Loader2, Plus, Pencil } from 'lucide-react'

interface DepartmentDialogProps {
    companies: { id: string; name: string }[]
    department?: {
        id: string;
        name: string;
        companyId: string;
        floorLocation: string | null;
    }
}

export function DepartmentDialog({ companies, department }: DepartmentDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [companyId, setCompanyId] = useState(department?.companyId || '')
    const isEditing = !!department

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = {
            companyId,
            name: formData.get('name') as string,
            floorLocation: formData.get('floorLocation') as string,
        }

        if (isEditing && department) {
            await updateDepartment(department.id, data)
        } else {
            await createDepartment(data)
        }

        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                    <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Button>
                ) : (
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Department
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                    <DialogDescription>{isEditing ? 'Update department details.' : 'Create a new department within a company.'}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Company *</Label>
                        <Select value={companyId} onValueChange={setCompanyId} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company) => (
                                    <SelectItem key={company.id} value={company.id}>
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Department Name *</Label>
                        <Input id="name" name="name" required defaultValue={department?.name} placeholder="Engineering" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="floorLocation">Floor/Location</Label>
                        <Input id="floorLocation" name="floorLocation" defaultValue={department?.floorLocation || ''} placeholder="3rd Floor" />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading || !companyId}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isEditing ? 'Save Changes' : 'Create Department'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
