import { redirect } from "next/navigation"

export default async function PastPaperAliasDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    redirect(`/past-papers/${id}`)
}

