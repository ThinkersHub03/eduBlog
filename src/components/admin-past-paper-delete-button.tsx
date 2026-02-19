'use client'

import { useState, useTransition } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { deletePastPaper } from '@/app/actions/admin-actions'
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogPanel, DialogTitle } from '@/components/ui/dialog'
import { toast } from '@/lib/toast'

interface AdminPastPaperDeleteButtonProps {
    id: string
    subject: string
    path: string
}

export function AdminPastPaperDeleteButton({ id, subject, path }: AdminPastPaperDeleteButtonProps) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const onConfirm = () => {
        setError(null)

        startTransition(async () => {
            const result = await deletePastPaper(id, path)
            if ('error' in result && result.error) {
                setError(result.error)
                toast.error(result.error)
                return
            }

            toast.success('Past paper deleted successfully.')
            setOpen(false)
        })
    }

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setError(null)
                    setOpen(true)
                }}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label={`Delete ${subject}`}
            >
                <Trash2 className="h-4 w-4" />
            </button>

            <Dialog open={open} onClose={() => !isPending && setOpen(false)}>
                <DialogPanel>
                    <DialogClose />
                    <DialogTitle>Delete Past Paper</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this past paper?
                    </DialogDescription>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                        <p className="text-sm font-bold text-gray-800 truncate">{subject}</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                            className="h-10 px-5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isPending}
                            className="h-10 px-5 rounded-xl font-black text-sm bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2 shadow-lg shadow-red-100 disabled:opacity-70"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Confirm Delete
                                </>
                            )}
                        </button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>
        </>
    )
}
