'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Trophy, Sparkles, Link as LinkIcon, Globe, Calendar } from "lucide-react"
import Link from "next/link"

export default function EditCompetitionPage() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [comp, setComp] = useState<any>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchComp() {
            const { data, error } = await supabase.from('competitions').select('*').eq('id', id).single()
            if (error) {
                alert("Error fetching event: " + error.message)
                router.push('/admin/competitions')
            } else {
                setComp(data)
            }
            setFetching(false)
        }
        fetchComp()
    }, [id, supabase, router])

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

        const { error } = await supabase.from('competitions').update(data).eq('id', id)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/competitions')
            router.refresh()
        }
        setLoading(false)
    }

    if (fetching) return <div className="py-20 text-center font-bold text-primary-400 uppercase tracking-widest animate-pulse">Loading Event...</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link href="/admin/competitions" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Return to Events
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Reschedule Event</h2>
                <p className="text-gray-500 font-medium">Modify the parameters and eligibility for this competition.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-gray-900">Modify Competition</CardTitle>
                                <CardDescription className="text-gray-500 font-medium pt-1">ID: {id}</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 px-8">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">Event Title</label>
                                <Input id="title" name="title" required defaultValue={comp.title} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="start_date" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Start Date
                                    </label>
                                    <Input id="start_date" name="start_date" type="date" defaultValue={comp.start_date} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="end_date" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        End Date
                                    </label>
                                    <Input id="end_date" name="end_date" type="date" defaultValue={comp.end_date} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-bold text-gray-700 ml-1">About the Event</label>
                                <Textarea id="description" name="description" defaultValue={comp.description} className="min-h-[150px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all pt-4" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="registration_link" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        Registration Link
                                    </label>
                                    <Input id="registration_link" name="registration_link" defaultValue={comp.registration_link} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="image_url" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <Globe className="h-3.5 w-3.5" />
                                        Banner Image URL
                                    </label>
                                    <Input id="image_url" name="image_url" defaultValue={comp.image_url} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-xl">
                                <Sparkles className="h-4 w-4" />
                                Live Updates
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" className="font-bold text-gray-500 rounded-2xl h-12 px-8" onClick={() => router.back()}>Discard</Button>
                                <Button type="submit" disabled={loading} className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white border-0">
                                    {loading ? 'Sycing...' : 'Update Event'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
