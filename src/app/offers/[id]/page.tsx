import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, MapPin, DollarSign, PieChart, CheckCircle2, MessageSquare } from "lucide-react"
import { CandidateHeader } from "@/components/candidate-header"

export default function OfferPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CandidateHeader />

            <main className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-sm text-muted-foreground mb-4">Dashboard / Candidate Offers</div>

                {/* Hero Card */}
                <div className="rounded-xl border bg-card p-0 shadow-sm overflow-hidden mb-8">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-[400px] h-48 md:h-auto bg-[#2C3E50] relative">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-merger-illustration-download-in-svg-png-gif-file-formats--acquisition-handshake-deal-partnership-agreement-pack-corporate-illustrations-4379435.png?f=webp" alt="Handshake" className="h-full w-full object-cover opacity-90" />
                        </div>
                        <div className="p-8 flex-1">
                            <h1 className="text-3xl font-bold mb-3">Congratulations, Sarah!</h1>
                            <p className="text-muted-foreground mb-6 max-w-xl">You have 1 active offer waiting for your response. Review the details below to take the next step in your career with TalentFlow.</p>
                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                <CheckCircle2 className="h-5 w-5" />
                                Verified Offer
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offer Details */}
                <div className="rounded-xl border bg-card shadow-sm mb-8">
                    <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl font-bold">Senior UX Designer</h2>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-none">PENDING RESPONSE</Badge>
                            </div>
                            <div className="text-muted-foreground">Product Design Team • Reporting to <span className="font-semibold text-foreground">Alex Morgan</span></div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground mb-1">Offer Expires in</div>
                            <div className="text-xl font-bold text-red-600 flex items-center gap-1 justify-end">
                                <span className="text-sm">⏱</span> 3 Days
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0">
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                                <DollarSign className="h-4 w-4" /> Base Salary
                            </div>
                            <div className="text-2xl font-bold">$120,000 <span className="text-sm text-muted-foreground font-normal">/ yr</span></div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                                <Calendar className="h-4 w-4" /> Start Date
                            </div>
                            <div className="text-2xl font-bold">Oct 24, 2023</div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                                <MapPin className="h-4 w-4" /> Location
                            </div>
                            <div className="text-xl font-bold">San Francisco</div>
                            <div className="text-xs text-muted-foreground">Hybrid (3 days onsite)</div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                                <PieChart className="h-4 w-4" /> Equity
                            </div>
                            <div className="text-2xl font-bold">0.05%</div>
                            <div className="text-xs text-muted-foreground">Vesting over 4 years</div>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Offer Details</h3>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
                        </div>

                        <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6 text-sm leading-relaxed">
                            <p><strong>Dear Sarah,</strong></p>
                            <p>We are pleased to offer you the position of <strong>Senior UX Designer</strong> at TalentFlow HR, reporting to Alex Morgan. We believe your skills and experience are an excellent match for our company.</p>
                            <p>In this role, you will be required to perform duties and responsibilities that are reasonable and consistent with such position as may be assigned to you from time to time. You will work from our San Francisco office on a hybrid schedule.</p>

                            <p className="font-semibold">Compensation:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Annual Base Salary: <strong>$120,000</strong>, paid semi-monthly.</li>
                                <li>Performance Bonus: Up to 10% of your annual base salary.</li>
                                <li>Stock Options: Option to purchase 5,000 shares of Common Stock.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t bg-gray-50">
                        <p className="text-xs text-muted-foreground max-w-lg">
                            By clicking "Sign & Accept", you agree to the terms outlined in the offer letter above and the <a href="#" className="underline">Employee Handbook</a>.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="outline" className="bg-white hover:bg-gray-50 px-6">Decline Offer</Button>
                            <Button className="px-6 bg-blue-600 hover:bg-blue-700">Sign & Accept 🎉</Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="outline" className="rounded-full shadow-sm bg-white hover:bg-gray-50">
                        <MessageSquare className="h-4 w-4 mr-2" /> Ask Recruiter a Question
                    </Button>
                </div>
            </main>
        </div>
    )
}
