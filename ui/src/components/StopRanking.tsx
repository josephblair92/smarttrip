import { StopList } from "./StopList"

export interface StopRankingProps {
    data: Record<string, number[]>
}

export function StopRanking ({ data }: StopRankingProps) {
    const stops = Object.entries(data).sort((a, b) => {
        return b[1].length - a[1].length;
    })
    return (
        <div>
            <StopList stops={stops} />
        </div>
    )
}