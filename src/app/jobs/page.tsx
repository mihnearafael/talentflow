"use client"

import { useState } from "react"
import { JobCard } from "@/components/job-card"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Search, Bell, Settings } from "lucide-react"
import { CandidateHeader } from "@/components/candidate-header"

export default function Home() {
    const jobs = [
        {
            title: "Senior Product Designer",
            company: "Dropbox",
            department: "Design",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$140k - $180k",
            tags: ["UI/UX", "Figma", "Prototyping"],
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
            highlight: true,
            postedAt: "2 hours ago"
        },
        {
            title: "Frontend Developer",
            company: "Airbnb",
            department: "Engineering",
            location: "Remote",
            type: "Contract",
            salary: "$120k - $150k",
            tags: ["React", "TypeScript", "Next.js"],
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
            postedAt: "5 hours ago"
        },
        {
            title: "Backend Engineer",
            company: "Stripe",
            department: "Engineering",
            location: "New York, NY",
            type: "Full-time",
            salary: "$160k - $210k",
            tags: ["Go", "Distributed Systems", "API"],
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
            postedAt: "1 day ago"
        },
        {
            title: "Marketing Manager",
            company: "Spotify",
            department: "Marketing",
            location: "London, UK",
            type: "Full-time",
            salary: "$90k - $120k",
            tags: ["Digital Marketing", "Campaigns", "Data Analysis"],
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
            postedAt: "2 days ago"
        },
        {
            title: "Data Scientist",
            company: "Netflix",
            department: "Engineering",
            location: "Los Gatos, CA",
            type: "Full-time",
            salary: "$180k - $250k",
            tags: ["Python", "Machine Learning", "SQL"],
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            postedAt: "3 days ago"
        }
    ]

    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])

    const filteredJobs = jobs.filter((job) => {
        const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(job.department)
        const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type)
        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location)
        return matchesDepartment && matchesType && matchesLocation
    })

    const clearFilters = () => {
        setSelectedDepartments([])
        setSelectedJobTypes([])
        setSelectedLocations([])
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Header */}
            <CandidateHeader />

            <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Board</h1>
                        <p className="text-muted-foreground mt-1">Find your next opportunity from top companies</p>
                    </div>
                    <Button size="lg" className="shadow-lg shadow-primary/20">Post a Job</Button>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <Sidebar
                        selectedDepartments={selectedDepartments}
                        setSelectedDepartments={setSelectedDepartments}
                        selectedJobTypes={selectedJobTypes}
                        setSelectedJobTypes={setSelectedJobTypes}
                        selectedLocations={selectedLocations}
                        setSelectedLocations={setSelectedLocations}
                        onClear={clearFilters}
                    />

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between pb-2">
                            <h2 className="font-semibold text-lg">Recommended Jobs <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">{filteredJobs.length}</span></h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Sort by:</span>
                                <select className="border-none bg-transparent font-medium text-foreground focus:ring-0">
                                    <option>Most Recent</option>
                                    <option>Relevance</option>
                                    <option>Salary (High-Low)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {filteredJobs.map((job) => (
                                <JobCard key={job.title + job.company} {...job} />
                            ))}
                            {filteredJobs.length === 0 && (
                                <div className="py-12 text-center text-muted-foreground bg-white rounded-lg border border-dashed">
                                    <p>No jobs match your filters.</p>
                                    <Button variant="link" onClick={clearFilters} className="mt-2">Clear all filters</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
