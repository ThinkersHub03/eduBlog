import { z } from 'zod'

const HeadingBlock = z.object({
    id: z.string().uuid().or(z.string()),
    type: z.literal('heading'),
    data: z.object({
        level: z.number().int().min(1).max(6),
        text: z.string().min(1)
    })
})

const ParagraphBlock = z.object({
    id: z.string().uuid().or(z.string()),
    type: z.literal('paragraph'),
    data: z.object({
        text: z.string().min(1)
    })
})

const ImageBlock = z.object({
    id: z.string().uuid().or(z.string()),
    type: z.literal('image'),
    data: z.object({
        url: z.string().url(),
        caption: z.string().optional()
    })
})

const FileBlock = z.object({
    id: z.string().uuid().or(z.string()),
    type: z.literal('file'),
    data: z.object({
        url: z.string().url(),
        name: z.string().min(1)
    })
})

export const PostContentSchema = z.array(z.union([HeadingBlock, ParagraphBlock, ImageBlock, FileBlock]))

export const PostValidator = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL friendly').optional(),
    content: PostContentSchema,
    featured_image: z.string().url().nullable().optional(),
    published: z.boolean().optional(),
})

export type PostBlock = z.infer<typeof PostContentSchema>[number]
export type PostContent = z.infer<typeof PostContentSchema>
export type PostPayload = z.infer<typeof PostValidator>
