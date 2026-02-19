'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { subscribeToToasts, type ToastPayload } from '@/lib/toast'

interface ActiveToast extends ToastPayload {
    createdAt: number
}

const AUTO_DISMISS_MS = 3500

export default function ToastProvider() {
    const [toasts, setToasts] = useState<ActiveToast[]>([])

    useEffect(() => {
        return subscribeToToasts((payload) => {
            setToasts((prev) => [...prev, { ...payload, createdAt: Date.now() }])
        })
    }, [])

    useEffect(() => {
        if (!toasts.length) return
        const interval = setInterval(() => {
            const now = Date.now()
            setToasts((prev) => prev.filter((item) => now - item.createdAt < AUTO_DISMISS_MS))
        }, 400)
        return () => clearInterval(interval)
    }, [toasts.length])

    return (
        <div className="fixed right-4 top-20 z-[100] flex w-full max-w-sm flex-col gap-2 pointer-events-none">
            {toasts.map((item) => (
                <div
                    key={item.id}
                    className={cn(
                        "pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl bg-white",
                        item.level === 'success' ? "border-green-200" : "border-red-200"
                    )}
                >
                    <div className="flex items-start gap-2">
                        {item.level === 'success' ? (
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                        ) : (
                            <XCircle className="h-4 w-4 mt-0.5 text-red-600" />
                        )}
                        <p className="text-sm font-medium text-gray-800">{item.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
