export const DisplayTypes = {
    CHART: 'chart',
    LIST: 'list',
    MAP: 'map'
} as const

export type DisplayType = (typeof DisplayTypes)[keyof typeof DisplayTypes]

export interface DisplayProps {
    data: Record<string, number[]>
}