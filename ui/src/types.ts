export const DisplayTypes = {
    CHART: 'chart',
    LIST: 'list',
    MAP: 'map'
} as const

export type DisplayType = (typeof DisplayTypes)[keyof typeof DisplayTypes]
export type StopData = Record<string, number[]>

export interface DisplayProps {
    data: StopData
}