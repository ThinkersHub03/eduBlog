import { redirect } from "next/navigation"

type SearchParams = Record<string, string | string[] | undefined>

export default function PastPapersAliasPage({ searchParams }: { searchParams: SearchParams }) {
    const params = new URLSearchParams()

    const board = typeof searchParams.board === 'string' ? searchParams.board : ''
    const classLevel = typeof searchParams.class_level === 'string' ? searchParams.class_level : ''
    const subject = typeof searchParams.subject === 'string' ? searchParams.subject : ''

    // Back-compat with older links that used `q` for searching.
    const legacyQ = typeof searchParams.q === 'string' ? searchParams.q : ''

    if (board) params.set('board', board)
    if (classLevel) params.set('class_level', classLevel)
    if (subject) params.set('subject', subject)
    else if (legacyQ) params.set('subject', legacyQ)
    if (typeof searchParams.page === 'string') params.set('page', searchParams.page)

    const qs = params.toString()
    redirect(qs ? `/past-papers?${qs}` : '/past-papers')
}

