import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Clock } from "lucide-react"

interface JobCardProps {
    title: string
    company?: string
    location: string
    type: string
    salary?: string
    description?: string
    tags?: string[]
    postedAt?: string
    logoUrl?: string
    highlight?: boolean
}

export function JobCard({
    title,
    company = "Google",
    location,
    type,
    salary,
    description,
    tags = [],
    postedAt = "2 days ago",
    logoUrl,
    highlight = false,
}: JobCardProps) {
    return (
        <div
            className={`group relative flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${highlight ? "border-primary/20 bg-primary/5" : "border-border"
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg border bg-white p-2">
                        {/* Placeholder for specific logos, defaulting to a building icon if no logo */}
                        {logoUrl ? (
                            <img src={logoUrl} alt={company} className="h-full w-full object-contain" />
                        ) : (
                            <div className="flrx h-full w-full items-center justify-center text-muted-foreground">
                                <Building2 className="h-full w-full opacity-50" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <div className="text-sm text-muted-foreground">{company}</div>
                    </div>
                </div>

                {highlight && (
                    <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                        Featured
                    </Badge>
                )}
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {type}
                </div>
                {salary && <div className="font-medium text-foreground">{salary}</div>}
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal text-muted-foreground">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="mt-2 flex items-center justify-between border-t pt-4">
                <span className="text-xs text-muted-foreground">{postedAt}</span>
                <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary">
                    Apply Now
                </Button>
            </div>
        </div>
    )
}
