import { Button } from "@/components/ui/button"

interface SidebarProps {
    selectedDepartments: string[];
    setSelectedDepartments: (depts: string[]) => void;
    selectedJobTypes: string[];
    setSelectedJobTypes: (types: string[]) => void;
    selectedLocations: string[];
    setSelectedLocations: (locs: string[]) => void;
    onClear: () => void;
}

export function Sidebar({
    selectedDepartments,
    setSelectedDepartments,
    selectedJobTypes,
    setSelectedJobTypes,
    selectedLocations,
    setSelectedLocations,
    onClear
}: SidebarProps) {
    const handleCheckboxChange = (
        value: string,
        selected: string[],
        setSelected: (values: string[]) => void
    ) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((item) => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    return (
        <div className="w-64 flex-shrink-0 space-y-8">
            <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">Department</h3>
                <div className="space-y-3">
                    {["Engineering", "Design", "Product", "Marketing", "Sales"].map((dept) => (
                        <label key={dept} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={selectedDepartments.includes(dept)}
                                onChange={() => handleCheckboxChange(dept, selectedDepartments, setSelectedDepartments)}
                            />
                            {dept}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">Job Type</h3>
                <div className="space-y-3">
                    {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={selectedJobTypes.includes(type)}
                                onChange={() => handleCheckboxChange(type, selectedJobTypes, setSelectedJobTypes)}
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">Location</h3>
                <div className="space-y-3">
                    {["Remote", "San Francisco, CA", "New York, NY", "London, UK", "Austin, TX"].map((loc) => (
                        <label key={loc} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={selectedLocations.includes(loc)}
                                onChange={() => handleCheckboxChange(loc, selectedLocations, setSelectedLocations)}
                            />
                            {loc}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">Salary Range</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <span>$0</span>
                        <span>$300k+</span>
                    </div>
                    <input type="range" className="w-full accent-primary" />
                </div>
            </div>

            <Button className="w-full" variant="outline" onClick={onClear}>Clear Filters</Button>
        </div>
    )
}
