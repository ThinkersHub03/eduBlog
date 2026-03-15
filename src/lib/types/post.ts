export type HeadingBlock = {
    id: string
    type: 'heading'
    data: {
        level: 1 | 2 | 3 | 4 | 5 | 6
        text: string
    }
}

export type ParagraphBlock = {
    id: string
    type: 'paragraph'
    data: {
        text: string
    }
}

export type ImageBlock = {
    id: string
    type: 'image'
    data: {
        url: string
        caption?: string
    }
}

export type FileBlock = {
    id: string
    type: 'file'
    data: {
        url: string
        name: string
    }
}

export type PostBlock = HeadingBlock | ParagraphBlock | ImageBlock | FileBlock

export type PostContent = PostBlock[]

export interface Post {
    id: string
    title: string
    slug: string
    content: PostContent
    featured_image?: string | null
    published: boolean
    created_at: string
}

// payload used when creating/updating from API
export interface PostPayload {
    title: string
    slug?: string
    content: PostContent
    featured_image?: string | null
    published?: boolean
}
