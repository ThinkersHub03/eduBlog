'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Context ────────────────────────────────────────────────────────────────────

interface DialogContextValue {
    open: boolean
    onClose: () => void
}

const DialogContext = React.createContext<DialogContextValue>({
    open: false,
    onClose: () => { },
})

// ── Root ───────────────────────────────────────────────────────────────────────

interface DialogProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Dialog({ open, onClose, children }: DialogProps) {
    // Close on Escape key
    React.useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    // Prevent body scroll when dialog is open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    if (!open) return null

    return (
        <DialogContext.Provider value={{ open, onClose }}>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in-0"
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Panel wrapper */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {children}
            </div>
        </DialogContext.Provider>
    )
}

// ── Panel ──────────────────────────────────────────────────────────────────────

interface DialogPanelProps {
    className?: string
    children: React.ReactNode
}

export function DialogPanel({ className, children }: DialogPanelProps) {
    return (
        <div
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
            className={cn(
                'relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in-0 zoom-in-95',
                className
            )}
        >
            {children}
        </div>
    )
}

// ── Close Button ───────────────────────────────────────────────────────────────

export function DialogClose({ className }: { className?: string }) {
    const { onClose } = React.useContext(DialogContext)
    return (
        <button
            type="button"
            onClick={onClose}
            className={cn(
                'absolute top-5 right-5 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors',
                className
            )}
            aria-label="Close dialog"
        >
            <X className="h-4 w-4" />
        </button>
    )
}

// ── Title ──────────────────────────────────────────────────────────────────────

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={cn('text-lg font-black text-gray-900', className)}>
            {children}
        </h2>
    )
}

// ── Description ────────────────────────────────────────────────────────────────

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn('text-sm text-gray-500 font-medium leading-relaxed', className)}>
            {children}
        </p>
    )
}

// ── Footer ─────────────────────────────────────────────────────────────────────

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('flex items-center justify-end gap-3 pt-2', className)}>
            {children}
        </div>
    )
}
