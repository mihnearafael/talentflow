'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, Briefcase, X } from "lucide-react"
import { AddEmployeeDialog } from "@/components/forms/add-employee-dialog"
import { AddJobDialog } from "@/components/forms/add-job-dialog"

interface GlobalQuickAddProps {
    companies: { id: string; name: string }[]
    departments: { id: string; name: string; companyId: string | null }[]
}

export function GlobalQuickAdd({ companies, departments }: GlobalQuickAddProps) {
    const [open, setOpen] = useState(false)
    const [employeeOpen, setEmployeeOpen] = useState(false)
    const [jobOpen, setJobOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={ref}>
            <Button
                size="sm"
                className="shadow-sm hover:shadow-md transition-all gap-2"
                onClick={() => setOpen(!open)}
            >
                {open ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                Quick Add
            </Button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-card shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-xs font-semibold text-muted-foreground px-2 py-2 mb-1 uppercase tracking-wider">Create New</div>

                    <button
                        onClick={() => { setEmployeeOpen(true); setOpen(false); }}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <UserPlus className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="text-foreground">Employee</div>
                            <div className="text-[10px] text-muted-foreground font-normal">Add to directory</div>
                        </div>
                    </button>

                    <button
                        onClick={() => { setJobOpen(true); setOpen(false); }}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="text-foreground">Job Posting</div>
                            <div className="text-[10px] text-muted-foreground font-normal">Create new opening</div>
                        </div>
                    </button>
                </div>
            )}

            <AddEmployeeDialog
                companies={companies}
                departments={departments}
                open={employeeOpen}
                onOpenChange={setEmployeeOpen}
                hideTrigger
            />

            <AddJobDialog
                departments={departments}
                open={jobOpen}
                onOpenChange={setJobOpen}
                hideTrigger
            />
        </div>
    )
}
