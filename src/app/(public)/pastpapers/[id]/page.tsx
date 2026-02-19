import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function PastPaperDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: paper } = await supabase
        .from('past_papers')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!paper) notFound()

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
            <div className="rounded-3xl bg-white border border-gray-100 p-6 space-y-4">
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

                <a href={paper.file_url} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Open / Download PDF
                    </Button>
                </a>
            </div>
        </div>
    )
}
