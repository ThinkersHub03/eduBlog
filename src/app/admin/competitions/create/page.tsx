'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Sparkles, Link as LinkIcon, Globe } from "lucide-react"
import Link from "next/link"

export default function CreateCompetitionPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            start_date: formData.get('start_date') as string || null,
            end_date: formData.get('end_date') as string || null,
            registration_link: formData.get('registration_link') as string,
            image_url: formData.get('image_url') as string,
        }

        const { error } = await supabase.from('competitions').insert(data)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/competitions')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link href="/admin/competitions" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Host Competition</h2>
                <p className="text-gray-500 font-medium">Create a new opportunity for students to showcase their skills.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                            <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black text-gray-900">Event Configuration</CardTitle>
                            <CardDescription className="text-gray-500 font-medium pt-1">Define dates, links, and detailed rules.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 px-8">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">Event Title</label>
                                <Input id="title" name="title" required placeholder="e.g. National Science Olympiad 2026" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="start_date" className="text-sm font-bold text-gray-700 ml-1">Start Date</label>
                                    <Input id="start_date" name="start_date" type="date" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="end_date" className="text-sm font-bold text-gray-700 ml-1">End Date</label>
                                    <Input id="end_date" name="end_date" type="date" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-bold text-gray-700 ml-1">About the Event</label>
                                <Textarea id="description" name="description" placeholder="Eligibility, rules, prizes, and more..." className="min-h-[150px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all pt-4" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="registration_link" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        Registration Link
                                    </label>
                                    <Input id="registration_link" name="registration_link" placeholder="https://form.jotform.com/..." className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="image_url" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <Globe className="h-3.5 w-3.5" />
                                        Banner Image URL
                                    </label>
                                    <Input id="image_url" name="image_url" placeholder="https://example.com/banner.jpg" className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-xl">
                                <Sparkles className="h-4 w-4" />
                                High Visibility
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" className="font-bold text-gray-500 rounded-2xl h-12 px-8" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" disabled={loading} className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white border-0">
                                    {loading ? 'Creating...' : 'Launch Event'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
