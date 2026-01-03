'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createCompany, updateCompany } from '@/actions/organizations'
import { Loader2, Plus, Pencil } from 'lucide-react'

interface CompanyDialogProps {
    company?: {
        id: string;
        name: string;
        industry: string | null;
        location: string | null;
        website: string | null;
        description: string | null;
    }
}

export function CompanyDialog({ company }: CompanyDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isEditing = !!company

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name') as string,
            industry: formData.get('industry') as string,
            location: formData.get('location') as string,
            website: formData.get('website') as string,
            description: formData.get('description') as string,
        }

        if (isEditing && company) {
            await updateCompany(company.id, data)
        } else {
            await createCompany(data)
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
                        Add Company
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Company' : 'Add New Company'}</DialogTitle>
                    <DialogDescription>{isEditing ? 'Update company details.' : 'Create a new company in your organization.'}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Company Name *</Label>
                        <Input id="name" name="name" required defaultValue={company?.name} placeholder="Acme Corp" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" name="industry" defaultValue={company?.industry || ''} placeholder="Technology" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={company?.location || ''} placeholder="San Francisco, CA" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" name="website" type="url" defaultValue={company?.website || ''} placeholder="https://example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={company?.description || ''} placeholder="Brief description of the company..." />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isEditing ? 'Save Changes' : 'Create Company'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
