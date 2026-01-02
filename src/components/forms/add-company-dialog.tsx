'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createCompany } from '@/actions/organizations'
import { Loader2, Plus } from 'lucide-react'

export function AddCompanyDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        await createCompany({
            name: formData.get('name') as string,
            industry: formData.get('industry') as string,
            location: formData.get('location') as string,
            website: formData.get('website') as string,
            description: formData.get('description') as string,
        })

        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Company
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>Create a new company in your organization.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Company Name *</Label>
                        <Input id="name" name="name" required placeholder="Acme Corp" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" name="industry" placeholder="Technology" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" placeholder="San Francisco, CA" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" name="website" type="url" placeholder="https://example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Brief description of the company..." />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Company
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
