declare module 'sanitize-html' {
    interface IOptions {
        allowedTags?: string[]
        allowedAttributes?: { [key: string]: string[] }
        allowedSchemes?: string[]
    }
    function sanitizeHtml(dirty: string, options?: IOptions): string
    export = sanitizeHtml
}
