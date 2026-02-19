'use client'

import { useState, useTransition } from 'react'
import { Trash2, Loader2, AlertTriangle } from 'lucide-react'
import { deleteBook } from '@/app/actions/admin-actions'
import { deleteRecord } from '@/app/actions/admin-actions'
import { Dialog, DialogPanel, DialogClose, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

interface DeleteButtonProps {
    /** The table to delete from. Use "books" for books — triggers Storage cleanup. */
    table: string
    id: string
    path: string
    /** Display name shown inside the confirmation modal */
    title?: string
}

export function AdminDeleteButton({ table, id, path, title }: DeleteButtonProps) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleConfirm = () => {
        setError(null)
        startTransition(async () => {
            const result = table === 'books'
                ? await deleteBook(id, path)
                : await deleteRecord(table, id, path)

            if ('error' in result && result.error) {
                setError(result.error)
            } else {
                setOpen(false)
            }
        })
    }

    const handleOpen = () => {
        setError(null)
        setOpen(true)
    }

    const handleClose = () => {
        if (!isPending) {
            setOpen(false)
            setError(null)
        }
    }

    return (
        <>
            {/* Trigger */}
            <button
                type="button"
                onClick={handleOpen}
                aria-label={`Delete ${title}`}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            {/* Confirmation Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogPanel>
                    <DialogClose />

                    {/* Icon + Title */}
                    <div className="flex items-start gap-4">
                        <div className="space-y-1 pt-0.5 text-left">
                            <DialogTitle>Delete Confirmation</DialogTitle>
                            <DialogDescription>
                                You are about to permanently delete:
                            </DialogDescription>
                        </div>

                    </div>

                    {/* Book name highlight */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                        <p className="text-sm font-bold text-gray-800 text-left truncate">"{title}"</p>
                    </div>

                    {/* Warning */}
                    <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
                        <p className="text-sm font-semibold text-red-700 text-left leading-relaxed">
                            This action will permanently delete the book and its associated file from storage.
                            <span className="block mt-1 font-normal text-red-500 text-left">This cannot be undone.</span>
                        </p>
                    </div>

                    {/* Inline error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isPending}
                            className="h-10 px-5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            style={{ pointerEvents: isPending ? 'none' : 'auto' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isPending}
                            className="h-10 px-5 rounded-xl font-black text-sm bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2 shadow-lg shadow-red-100"
                            style={{ pointerEvents: isPending ? 'none' : 'auto' }}
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
