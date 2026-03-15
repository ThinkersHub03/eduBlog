"use client"

import { useEffect, useRef } from "react"
import { Search, Home, Info, Settings, User, Mail, Moon, Bell, Maximize } from "lucide-react"
import Link from "next/link"

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            setTimeout(() => inputRef.current?.focus(), 50)
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
                <div className="flex items-center px-4 py-4 border-b border-gray-100">
                    <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent text-gray-900 border-none outline-none text-[16px] placeholder:text-gray-400 py-1"
                    />
                    <kbd className="hidden sm:inline-flex items-center justify-center text-[10px] font-semibold text-gray-500 bg-gray-100 h-6 px-2 rounded ml-2 border border-gray-200">
                        ESC
                    </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-1">Navigation</div>
                    {[
                        { icon: Home, label: "Go to Home", sub: "Navigate to the home page", href: "/" },
                        { icon: Info, label: "Go to About", sub: "Learn more about us", href: "/about" },
                        { icon: Settings, label: "Go to Settings", sub: "Configure your preferences", href: "/settings" },
                        { icon: User, label: "Go to Profile", sub: "View and edit your profile", href: "/profile" },
                        { icon: Mail, label: "Go to Messages", sub: "Check your messages and notifications", href: "/messages" },
                    ].map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-start gap-3.5 px-3 py-2.5 rounded-lg hover:bg-gray-100/80 transition-colors group ${i === 3 ? "bg-gray-50" : ""}`}
                        >
                            <div className="mt-0.5"><item.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} /></div>
                            <div className="flex-1 text-left">
                                <div className="text-[14px] font-medium text-gray-800 group-hover:text-gray-900 leading-tight">{item.label}</div>
                                <div className="text-[13px] text-gray-500 mt-0.5">{item.sub}</div>
                            </div>
                            <div className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center h-full pt-1">Navigation</div>
                        </Link>
                    ))}

                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">System</div>
                    {[
                        { icon: Moon, label: "Toggle Theme", sub: "Switch between light, dark, and system themes" },
                        { icon: Bell, label: "Toggle Notifications", sub: "Enable or disable notifications" },
                        { icon: Maximize, label: "Toggle Fullscreen", sub: "Enter or exit fullscreen mode" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            onClick={onClose}
                            className="w-full flex items-start gap-3.5 px-3 py-2.5 rounded-lg hover:bg-gray-100/80 transition-colors group text-left"
                        >
                            <div className="mt-0.5"><item.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} /></div>
                            <div className="flex-1 text-left">
                                <div className="text-[14px] font-medium text-gray-800 group-hover:text-gray-900 leading-tight">{item.label}</div>
                                <div className="text-[13px] text-gray-500 mt-0.5">{item.sub}</div>
                            </div>
                            <div className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center h-full pt-1">System</div>
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    )
}
