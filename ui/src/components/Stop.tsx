import { Lines } from "./Lines";
import stopLines from '../data/stopLines.json'

export interface StopProps {
    name: string,
    timestamps: number[]
    rank: number
}

export function Stop ({ name, rank, timestamps }: StopProps) {
    return (
        <div className="w-90" data-tooltip-id="stop-list" data-visits={timestamps.join()}>
            <div className="flex justify-between bg-yellow-950 p-2 gap-3 items-center">
                <div className="flex gap-2 items-center">
                    <h3 className="text-gray-400">{rank}</h3>
                    <h3 className="text-xl text-white font-semibold">{name}</h3>
                    <h3 className="text-gray-400">({timestamps.length})</h3>
                </div>
                <Lines lines={stopLines[name as keyof typeof stopLines] ?? []} />
            </div>
        </div>
    )
}