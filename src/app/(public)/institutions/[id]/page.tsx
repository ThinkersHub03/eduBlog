import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { MapPin, Building2, Calendar } from "lucide-react"

export default async function InstitutionPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: institution } = await supabase
        .from('institutions')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!institution) {
        notFound()
    }

    return (
        <div className="container py-8 max-w-4xl">
            <div className="flex items-start gap-6 mb-8">
                {institution.logo_url && (
                    <div className="h-24 w-24 rounded-lg border overflow-hidden shrink-0">
                        <img src={institution.logo_url} alt={institution.name} className="h-full w-full object-cover" />
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{institution.type}</span>
                    </div>
                    <h1 className="text-3xl font-bold">{institution.name}</h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {institution.city}
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">About</h2>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                            {institution.description}
                        </p>
                    </section>

                    {/* Add Courses, Admissions, etc here */}
                </div>

                <aside className="space-y-6">
                    <div className="rounded-lg border p-4 bg-muted/20">
                        <h3 className="font-semibold mb-3">Quick Info</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type</span>
                                <span>{institution.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Location</span>
                                <span>{institution.city}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
