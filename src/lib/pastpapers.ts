export const PAST_PAPERS_BUCKET = 'past-papers'

export function slugSegment(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'general'
}

export function sanitizePdfFileName(fileName: string) {
    const base = fileName.replace(/\.pdf$/i, '')
    const cleaned = base
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return `${cleaned || 'paper'}.pdf`
}

export function buildPastPaperStoragePath(params: {
    board: string
    classLevel: string
    year: number
    originalFileName: string
}) {
    const board = slugSegment(params.board)
    const classLevel = slugSegment(params.classLevel)
    const year = String(params.year)
    const safeFileName = sanitizePdfFileName(params.originalFileName)
    return `${board}/${classLevel}/${year}/${Date.now()}-${safeFileName}`
}

export function extractPastPapersStoragePath(fileUrl: string) {
    const match = fileUrl.match(/\/object\/public\/past-papers\/(.+)$/)
    return match?.[1] ? decodeURIComponent(match[1]) : null
}
