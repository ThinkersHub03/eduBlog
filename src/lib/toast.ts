export type ToastLevel = 'success' | 'error'

export interface ToastPayload {
    id: string
    level: ToastLevel
    message: string
}

const TOAST_EVENT = 'app:toast'

function emit(level: ToastLevel, message: string) {
    if (typeof window === 'undefined') return
    const payload: ToastPayload = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        level,
        message,
    }
    window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }))
}

export const toast = {
    success(message: string) {
        emit('success', message)
    },
    error(message: string) {
        emit('error', message)
    },
}

export function subscribeToToasts(handler: (payload: ToastPayload) => void) {
    if (typeof window === 'undefined') return () => { }

    const listener = (event: Event) => {
        const customEvent = event as CustomEvent<ToastPayload>
        handler(customEvent.detail)
    }

    window.addEventListener(TOAST_EVENT, listener as EventListener)
    return () => window.removeEventListener(TOAST_EVENT, listener as EventListener)
}
