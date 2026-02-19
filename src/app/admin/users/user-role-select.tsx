'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateUserRole } from "@/app/actions/user-actions"
// import { toast } from "sonner" 

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface UserRoleSelectProps {
    userId: string
    currentRole: 'user' | 'admin'
}

export function UserRoleSelect({ userId, currentRole }: UserRoleSelectProps) {
    const [loading, setLoading] = useState(false)

    const handleRoleChange = async (newRole: 'user' | 'admin') => {
        if (newRole === currentRole) return

        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        setLoading(true)
        const result = await updateUserRole(userId, newRole)
        setLoading(false)

        if (result.error) {
            alert(result.error)
        } else {
            // Success
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Select
                defaultValue={currentRole}
                onValueChange={(val) => handleRoleChange(val as 'user' | 'admin')}
                disabled={loading}
            >
                <SelectTrigger className="w-[100px] h-8">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
