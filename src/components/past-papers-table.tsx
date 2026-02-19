import Link from "next/link"
import { FileText, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminPastPaperDeleteButton } from "@/components/admin-past-paper-delete-button"

export interface PastPaperRow {
    id: string
    subject: string
    year: number
    board: string
    class_level: string
    exam_shift: string
    is_solved: boolean
}

interface PastPapersTableProps {
    data: PastPaperRow[]
    path: string
}

export function PastPapersTable({ data, path }: PastPapersTableProps) {
    if (!data.length) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center bg-white">
                <FileText className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No past papers found.</p>
            </div>
        )
    }

    return (
        <>
            <div className="hidden md:block rounded-2xl border border-gray-100 overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Board</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Shift</TableHead>
                            <TableHead>Solved</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((paper) => (
                            <TableRow key={paper.id} className="hover:bg-gray-50">
                                <TableCell className="font-semibold text-gray-900">{paper.subject}</TableCell>
                                <TableCell>{paper.board}</TableCell>
                                <TableCell>{paper.class_level}</TableCell>
                                <TableCell>{paper.year}</TableCell>
                                <TableCell className="capitalize">{paper.exam_shift}</TableCell>
                                <TableCell>{paper.is_solved ? "Yes" : "No"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/pastpapers/${paper.id}`}
                                            className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                            aria-label={`Edit ${paper.subject}`}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        <AdminPastPaperDeleteButton id={paper.id} subject={paper.subject} path={path} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {data.map((paper) => (
                    <div key={paper.id} className="rounded-2xl border border-gray-100 bg-white p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-base font-bold text-gray-900">{paper.subject}</p>
                                <p className="text-sm text-gray-500">{paper.board} · {paper.class_level}</p>
                            </div>
                            <span className="text-xs font-bold bg-gray-100 rounded-lg px-2 py-1">{paper.year}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="capitalize">Shift: {paper.exam_shift}</span>
                            <span>Solved: {paper.is_solved ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Link
                                href={`/admin/pastpapers/${paper.id}`}
                                className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                aria-label={`Edit ${paper.subject}`}
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                            <AdminPastPaperDeleteButton id={paper.id} subject={paper.subject} path={path} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
