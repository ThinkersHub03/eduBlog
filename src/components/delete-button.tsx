'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface DeleteButtonProps {
    id: string
    table: string
}

export function DeleteButton({ id, table }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;

        setLoading(true)
        const { error } = await supabase.from(table).delete().eq('id', id)

        if (error) {
            alert(error.message)
        } else {
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <Button variant="destructive" size="icon" onClick={handleDelete} disabled={loading} className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
