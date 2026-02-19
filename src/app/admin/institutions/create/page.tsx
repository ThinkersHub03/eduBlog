'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, Sparkles, MapPin, Globe, GraduationCap, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export default function CreateInstitutionPage() {
    const [loading, setLoading] = useState(false)
    const [logoUrl, setLogoUrl] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const data = {
            name: formData.get('name') as string,
            city: formData.get('city') as string,
            address: formData.get('address') as string,
            type: formData.get('type') as string,
            website: formData.get('website') as string,
            description: formData.get('description') as string,
            logo_url: logoUrl,
        }

        const { error } = await supabase.from('institutions').insert(data)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/institutions')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link href="/admin/institutions" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Registry Overview
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Register Institution</h2>
                <p className="text-gray-500 font-medium">Onboard a new educational entity to the platform's searchable registry.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black text-gray-900">Entity Profile</CardTitle>
                            <CardDescription className="text-gray-500 font-medium pt-1">Establish the public identity of the institution.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 px-8">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1 font-outfit">Full Institution Name</label>
                                <Input id="name" name="name" required placeholder="e.g. University of Information Technology" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="type" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <GraduationCap className="h-3.5 w-3.5 text-primary-600" />
                                        Institutional Type
                                    </label>
                                    <select id="type" name="type" className="flex h-12 w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-2 text-sm font-bold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all shadow-sm">
                                        <option value="University">University</option>
                                        <option value="College">College</option>
                                        <option value="School">School</option>
                                        <option value="Academy">Academy</option>
                                        <option value="Institute">Institute</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-primary-600" />
                                        Primary City
                                    </label>
                                    <Input id="city" name="city" required placeholder="e.g. Islamabad" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-bold text-gray-700 ml-1">Street Address</label>
                                <Input id="address" name="address" placeholder="e.g. Sector H-9, Near Zero Point" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="website" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5 text-primary-600" />
                                    Official Website
                                </label>
                                <Input id="website" name="website" placeholder="https://www.example.edu.pk" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                    <ImageIcon className="h-3.5 w-3.5 text-primary-600" />
                                    Institutional Logo
                                </label>
                                <div className="grid md:grid-cols-[120px_1fr] gap-6 items-center">
                                    <div className="h-24 w-24 rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <Building2 className="h-8 w-8 text-gray-200" />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <FileUpload onUpload={setLogoUrl} folder="institutions" />
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">PNG or SVG preferred for transparent backgrounds.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-bold text-gray-700 ml-1">Propectus / About</label>
                                <Textarea id="description" name="description" placeholder="Provide a brief historical and academic background of the institution." className="min-h-[150px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all pt-4 shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-xl">
                                <Sparkles className="h-4 w-4" />
                                Registry Sync
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" className="font-bold text-gray-500 rounded-2xl h-12 px-8" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" disabled={loading} className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white border-0">
                                    {loading ? 'Registering...' : 'Register Entity'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
