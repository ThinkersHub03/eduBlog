/**
 * Represents a filter option with a value and display label.
 */
export type FilterOption = { value: string; label: string }

/**
 * Defines the possible filters for past papers search.
 */
export type PastPapersFilters = {
    board?: string
    class_level?: string
    subject?: string
}

/**
 * Simplified error type for Supabase operations.
 */
type SupabaseErrorLike = { message?: string } | null

/**
 * Result type for Supabase select queries.
 */
type SupabaseSelectResult<Row> = Promise<{ data: Row[] | null; error: SupabaseErrorLike }>

/**
 * Simplified Supabase query interface for abstraction and testability.
 */
type SupabaseQuery<Row> = {
    select: (columns: string) => SupabaseQuery<Row>
    order: (column: string) => SupabaseQuery<Row>
    limit: (count: number) => SupabaseSelectResult<Row>
}

/**
 * Simplified Supabase client interface.
 */
type SupabaseClientLike = {
    from: (table: string) => SupabaseQuery<any>
}

/**
 * Regular expression to match control characters for sanitization.
 */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g

/**
 * Normalizes and sanitizes a query parameter value.
 * Handles arrays, non-strings, and removes control characters.
 * @param value - The raw value from query params.
 * @param maxLen - Maximum allowed length (default: 80).
 * @returns Sanitized string value.
 */
export function normalizeQueryParam(value: unknown, maxLen = 80): string {
    if (Array.isArray(value)) value = value[0]
    if (typeof value !== 'string') return ''
    return value.replace(CONTROL_CHARS, '').trim().slice(0, maxLen)
}

/**
 * Converts an array of strings into sorted filter options.
 * Filters out empty values and sorts using locale-aware collation.
 * @param values - Array of string values.
 * @returns Array of FilterOption objects.
 */
function toOptions(values: string[]): FilterOption[] {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
    return values
        .filter(Boolean)
        .sort((a, b) => collator.compare(a, b))
        .map((value) => ({ value, label: value }))
}

/**
 * Retrieves distinct values for a specific column from the past_papers table.
 * @param supabase - The Supabase client instance.
 * @param column - The column name to retrieve distinct values for.
 * @returns Promise resolving to an array of distinct string values.
 */
async function getDistinctValues(supabase: SupabaseClientLike, column: string): Promise<string[]> {
    const { data, error } = await supabase
        .from('past_papers')
        .select(column)
        .order(column)

    if (error) {
        console.error(`Error fetching ${column}:`, error.message)
        return []
    }

    // Extract values, filter, trim, and remove duplicates using Set
    const values = (data || [])
        .map((row) => row[column])
        .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
        .map((value) => value.trim())

    return Array.from(new Set(values))
}

/**
 * Fetches filter options for past papers (boards, class levels, subjects).
 * Uses distinct queries to ensure all unique values are retrieved without limits.
 * @param supabase - The Supabase client instance.
 * @returns Promise resolving to an object with arrays of filter options.
 */
export async function getPastPapersFilterOptions(
    supabase: SupabaseClientLike
): Promise<{
    boards: FilterOption[]
    classLevels: FilterOption[]
    subjects: FilterOption[]
}> {
    // Fetch distinct values for each filter category in parallel
    const [boards, classLevels, subjects] = await Promise.all([
        getDistinctValues(supabase, 'board'),
        getDistinctValues(supabase, 'class_level'),
        getDistinctValues(supabase, 'subject'),
    ])

    return {
        boards: toOptions(boards),
        classLevels: toOptions(classLevels),
        subjects: toOptions(subjects),
    }
}
