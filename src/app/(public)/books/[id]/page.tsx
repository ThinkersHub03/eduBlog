import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import BookSiteDetails from "@/components/BookSiteDetails"

export default async function BookDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: book } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single()

    if (!book) notFound()

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
            <BookSiteDetails />

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge>{book.board}</Badge>
                    <Badge variant="secondary">{book.class_level}</Badge>
                    <Badge variant="secondary">{book.subject}</Badge>
                </div>

                <h1 className="text-3xl font-black text-gray-900">{book.title}</h1>
                <p className="text-sm text-gray-500">
                    Added on {new Date(book.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Book Preview</h2>
                <div className="w-full h-96 border border-gray-200 rounded-lg overflow-hidden">
                    <embed
                        src={book.file_url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                    />
                </div>
            </div>

            <div className="space-y-4 text-center">
                <h2 className="text-lg sm:text-xl font-bold text-green-700">How to Use This Book</h2>
                <p className="text-gray-700 text-sm sm:text-base">
                    Textbooks are essential for building a strong foundation in your subjects. Here's how to make the most of this resource:
                </p>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base text-left mx-auto max-w-md">
                    <li>Read chapters systematically to understand concepts.</li>
                    <li>Take notes and highlight important points.</li>
                    <li>Practice exercises and solve problems regularly.</li>
                    <li>Use as a reference for assignments and exam preparation.</li>
                    <li>Combine with other study materials for comprehensive learning.</li>
                </ul>
                <p className="text-gray-700 text-sm sm:text-base mt-4">
                    Consistent study with quality textbooks leads to better academic performance. Keep learning!
                </p>
            </div>

            <div className="flex gap-4">
                <a href={book.file_url} download>
                    <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </a>
                <a href={book.file_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                        <Printer className="h-4 w-4" />
                        Print PDF
                    </Button>
                </a>
            </div>
        </div>
    )
}