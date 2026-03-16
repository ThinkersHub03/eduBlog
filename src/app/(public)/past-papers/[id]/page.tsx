import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import SiteDetails from "@/components/SiteDetails"

export default async function PastPaperDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: paper } = await supabase
        .from('past_papers')
        .select('*')
        .eq('id', id)
        .single()

    if (!paper) notFound()

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
            <SiteDetails />

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge>{paper.board}</Badge>
                    <Badge variant="secondary">{paper.class_level}</Badge>
                    <Badge variant="secondary">{paper.year}</Badge>
                    <Badge variant="secondary" className="capitalize">{paper.exam_shift}</Badge>
                    <Badge variant={paper.is_solved ? "default" : "secondary"}>
                        {paper.is_solved ? "Solved" : "Unsolved"}
                    </Badge>
                </div>

                <h1 className="text-3xl font-black text-gray-900">{paper.subject}</h1>
                <p className="text-sm text-gray-500">
                    Added on {new Date(paper.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">PDF Viewer</h2>
                <div className="w-full h-96 border border-gray-200 rounded-lg overflow-hidden">
                    <embed
                        src={paper.file_url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                    />
                </div>
            </div>

            <div className="space-y-4 text-center">
                <h2 className="text-lg sm:text-xl font-bold text-green-700">How to Use This Past Paper</h2>
                <p className="text-gray-700 text-sm sm:text-base">
                    Past papers are an excellent way to prepare for exams. Here's how to make the most of this resource:
                </p>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base text-left mx-auto max-w-md">
                    <li>Review the questions and try to answer them without looking at solutions.</li>
                    <li>Time yourself to simulate exam conditions.</li>
                    <li>Compare your answers with the solved version if available.</li>
                    <li>Identify weak areas and focus your study on those topics.</li>
                    <li>Repeat with similar papers to build confidence.</li>
                </ul>
                <p className="text-gray-700 text-sm sm:text-base mt-4">
                    Remember, consistent practice with past papers can significantly improve your exam performance. Happy studying!
                </p>
            </div>

            <div className="flex gap-4">
                <a href={paper.file_url} download>
                    <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </a>
                <a href={paper.file_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                        <Printer className="h-4 w-4" />
                        Print PDF
                    </Button>
                </a>
            </div>
        </div>
    )
}
