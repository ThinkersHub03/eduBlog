'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FileUploadProps {
    onUpload: (url: string) => void
    /**
     * folder inside the bucket; e.g. "images" or "files". The full path
     * that will be uploaded to is `${folder}/${random}.${ext}`.
     */
    folder?: string
    /**
     * name of the storage bucket (defaults to 'blog').
     */
    bucket?: string
}

export function FileUpload({ onUpload, folder = 'uploads', bucket = 'blogs' }: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const supabase = createClient()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select a file to upload.')
            }

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${folder}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

            onUpload(data.publicUrl)
        } catch (error) {
            alert('Error uploading file!')
            console.log(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <Input
                type="file"
                disabled={uploading}
                onChange={handleUpload}
                className="cursor-pointer"
            />
            {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
        </div>
    )
}
