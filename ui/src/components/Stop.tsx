import { useState } from "react"

export interface StopProps {
    name: string,
    timestamps: number[]
    rank: number
}

export function Stop ({ name, rank, timestamps }: StopProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(cur => !cur)
    }
    return (
        <div className="w-90" data-tooltip-id="stop-list" data-visits={timestamps.join()}>
            <div className="flex justify-between bg-yellow-950 p-2">
                <div className="flex gap-2 items-center">
                    <h3 className="text-gray-400">{rank}</h3>
                    <h3 className="text-xl text-white font-semibold">{name}</h3>
                    <h3 className="text-gray-400">({timestamps.length})</h3>
                </div>
                <button className="bg-blue-400 p-3 inline-flex items-center justify-center rounded-[50%] h-5 w-5" onClick={toggleExpanded}>{expanded ? '-' : '+'}</button>
            </div>
        </div>
    )
}