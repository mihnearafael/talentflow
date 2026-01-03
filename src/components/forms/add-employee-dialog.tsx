'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createEmployee } from '@/actions/employees'
import { Loader2, UserPlus } from 'lucide-react'

interface AddEmployeeDialogProps {
    companies: { id: string; name: string }[]
    departments: { id: string; name: string; companyId: string | null }[]
    open?: boolean
    onOpenChange?: (open: boolean) => void
    hideTrigger?: boolean
}

export function AddEmployeeDialog({ companies, departments, open: controlledOpen, onOpenChange: setControlledOpen, hideTrigger }: AddEmployeeDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = isControlled && setControlledOpen ? setControlledOpen : setInternalOpen

    const [loading, setLoading] = useState(false)
    const [companyId, setCompanyId] = useState('')
    const [departmentId, setDepartmentId] = useState('')

    const filteredDepartments = departments.filter(d => d.companyId === companyId)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        await createEmployee({
            companyId,
            departmentId,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            hireDate: formData.get('hireDate') as string,
            jobTitle: formData.get('jobTitle') as string,
            salary: formData.get('salary') as string,
        })

        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!hideTrigger && (
                <DialogTrigger asChild>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>Create a new employee record.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" name="firstName" required placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" name="lastName" required placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+1 555-0123" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company *</Label>
                            <Select value={companyId} onValueChange={(v) => { setCompanyId(v); setDepartmentId(''); }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select company" />
                                </SelectTrigger>
                                <SelectContent>
                                    {companies.map((company) => (
                                        <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Department *</Label>
                            <Select value={departmentId} onValueChange={setDepartmentId} disabled={!companyId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredDepartments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title *</Label>
                            <Input id="jobTitle" name="jobTitle" required placeholder="Software Engineer" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary *</Label>
                            <Input id="salary" name="salary" type="number" required placeholder="75000" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hireDate">Hire Date *</Label>
                        <Input id="hireDate" name="hireDate" type="date" required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading || !companyId || !departmentId}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Add Employee
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
