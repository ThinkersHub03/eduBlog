'use client'

import { useState } from 'react'
import { nanoid } from 'nanoid'
import { FileUpload } from './file-upload'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { PostBlock } from '@/lib/types/post'

export type BlockType = 'heading' | 'paragraph' | 'image' | 'file'

interface BlockEditorProps {
    blocks: PostBlock[]
    onChange: (blocks: PostBlock[]) => void
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
    const [localBlocks, setLocalBlocks] = useState<PostBlock[]>(blocks)

    const apply = (updated: PostBlock[]) => {
        setLocalBlocks(updated)
        onChange(updated)
    }

    const addBlock = (type: BlockType, index?: number) => {
        const newBlock = {
            id: nanoid(),
            type,
            data: type === 'heading'
                ? { level: 2, text: '' }
                : type === 'paragraph'
                    ? { text: '' }
                    : type === 'image'
                        ? { url: '', caption: '' }
                        : { url: '', name: '' },
        } as PostBlock
        const arr = [...localBlocks]
        if (typeof index === 'number') arr.splice(index, 0, newBlock)
        else arr.push(newBlock)
        apply(arr)
    }

    const updateBlock = (id: string, data: any) => {
        const arr = localBlocks.map(b => b.id === id ? { ...b, data } : b)
        apply(arr)
    }

    const removeBlock = (id: string) => {
        apply(localBlocks.filter(b => b.id !== id))
    }

    const moveBlock = (id: string, direction: 'up' | 'down') => {
        const idx = localBlocks.findIndex(b => b.id === id)
        if (idx === -1) return
        const arr = [...localBlocks]
        const [block] = arr.splice(idx, 1)
        const newIdx = direction === 'up' ? idx - 1 : idx + 1
        if (newIdx < 0 || newIdx > arr.length) return
        arr.splice(newIdx, 0, block)
        apply(arr)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap mb-4">
                <Button size="sm" onClick={() => addBlock('heading')}>Heading</Button>
                <Button size="sm" onClick={() => addBlock('paragraph')}>Paragraph</Button>
                <Button size="sm" onClick={() => addBlock('image')}>Image</Button>
                <Button size="sm" onClick={() => addBlock('file')}>File</Button>
            </div>
            {localBlocks.map((block, i) => (
                <div key={block.id} className="relative border rounded-xl p-4 bg-white">
                    <div className="absolute top-2 right-2 flex gap-1">
                        <button type="button" onClick={() => moveBlock(block.id, 'up')} disabled={i === 0} className="text-xs uppercase">↑</button>
                        <button type="button" onClick={() => moveBlock(block.id, 'down')} disabled={i === localBlocks.length - 1} className="text-xs uppercase">↓</button>
                        <button type="button" onClick={() => removeBlock(block.id)} className="text-xs text-red-500">✕</button>
                    </div>
                    {block.type === 'heading' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Heading level</label>
                            <select
                                value={block.data.level}
                                onChange={e => updateBlock(block.id, { ...block.data, level: Number(e.target.value) })}
                                className="block w-24"
                            >
                                {[1,2,3,4,5,6].map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <Input
                                value={block.data.text}
                                onChange={e => updateBlock(block.id, { ...block.data, text: e.target.value })}
                                placeholder="Heading text"
                            />
                        </div>
                    )}
                    {block.type === 'paragraph' && (
                        <Textarea
                            value={block.data.text}
                            onChange={e => updateBlock(block.id, { ...block.data, text: e.target.value })}
                            placeholder="Write paragraph (HTML allowed for inline links)"
                            rows={4}
                        />
                    )}
                    {block.type === 'image' && (
                        <div className="space-y-2">
                            {block.data.url ? (
                                <img src={block.data.url} alt="" className="max-w-full h-auto rounded" />
                            ) : null}
                            <FileUpload
                                onUpload={url => updateBlock(block.id, { ...block.data, url })}
                                folder="images"
                                bucket="blogs"
                            />
                            <Input
                                value={block.data.caption || ''}
                                onChange={e => updateBlock(block.id, { ...block.data, caption: e.target.value })}
                                placeholder="Caption (optional)"
                            />
                        </div>
                    )}
                    {block.type === 'file' && (
                        <div className="space-y-2">
                            {block.data.url ? (
                                <div className="flex items-center gap-2">
                                    <a href={block.data.url} target="_blank" rel="noopener noreferrer" className="underline">
                                        {block.data.name || 'download file'}
                                    </a>
                                </div>
                            ) : null}
                            <FileUpload
                                onUpload={url => updateBlock(block.id, { ...block.data, url })}
                                folder="files"
                                bucket="blogs"
                            />
                            <Input
                                value={block.data.name || ''}
                                onChange={e => updateBlock(block.id, { ...block.data, name: e.target.value })}
                                placeholder="Filename (optional)"
                            />
                        </div>
                    )}
                </div>
            ))}
            {localBlocks.length === 0 && (
                <p className="text-gray-400">Start by adding a block above.</p>
            )}
        </div>
    )
}