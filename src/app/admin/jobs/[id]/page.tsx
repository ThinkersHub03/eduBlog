'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Briefcase, Sparkles, MapPin, Calendar, LayoutList, Save } from "lucide-react"
import Link from "next/link"

export default function EditJobPage() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [job, setJob] = useState<any>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single()
            if (error) {
                alert("Error fetching job: " + error.message)
                router.push('/admin/jobs')
            } else if (data) {
                setJob(data)
            }
            setFetching(false)
        }
        fetchData()
    }, [id, supabase, router])

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get('title') as string,
            company: formData.get('company') as string,
            city: formData.get('city') as string,
            category: formData.get('category') as string,
            last_date: formData.get('last_date') as string || null,
            description: formData.get('description') as string,
        }

        const { error } = await supabase.from('jobs').update(data).eq('id', id)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/jobs')
            router.refresh()
        }
        setLoading(false)
    }

    if (fetching) return <div className="py-20 text-center font-bold text-gray-400 uppercase tracking-widest animate-pulse">Retrieving Posting...</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Career Portal
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Revise Posting</h2>
                <p className="text-gray-500 font-medium">Update the job specifications and application timelines for this role.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                                <Save className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-gray-900">Modify Listing</CardTitle>
                                <CardDescription className="text-gray-500 font-medium pt-1">ID: {id}</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 px-8">
                    <form onSubmit={handleUpdate} className="space-y-10">
                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">Job Title</label>
                                <Input id="title" name="title" required defaultValue={job.title} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-bold text-gray-700 ml-1">Hiring Organization</label>
                                    <Input id="company" name="company" required defaultValue={job.company} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-primary-600" />
                                        City / Region
                                    </label>
                                    <Input id="city" name="city" defaultValue={job.city} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <LayoutList className="h-3.5 w-3.5 text-primary-600" />
                                        Functional Category
                                    </label>
                                    <select id="category" name="category" defaultValue={job.category} className="flex h-12 w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-2 text-sm font-bold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all shadow-sm">
                                        <option value="Teaching">Teaching</option>
                                        <option value="Management">Management</option>
                                        <option value="IT & Development">IT & Development</option>
                                        <option value="Administration">Administration</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last_date" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-primary-600" />
                                        Application Deadline
                                    </label>
                                    <Input id="last_date" name="last_date" type="date" defaultValue={job.last_date} className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-bold text-gray-700 ml-1">Job Specification</label>
                                <Textarea id="description" name="description" defaultValue={job.description} className="min-h-[200px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all pt-4 shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-xl">
                                <Sparkles className="h-4 w-4" />
                                Outreach Sync
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" className="font-bold text-gray-500 rounded-2xl h-12 px-8" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" disabled={loading} className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white border-0">
                                    {loading ? 'Archiving...' : 'Update Posting'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
