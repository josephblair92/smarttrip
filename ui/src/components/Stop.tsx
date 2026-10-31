import { useState } from "react"

export interface StopProps {
    name: string,
    timestamps: number[]
}

export function Stop ({ name, timestamps }: StopProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(cur => !cur)
    }
    return (
        <div className="w-70" data-tooltip-id="stop-list" data-visits={timestamps.join()}>
            <div className="flex justify-between bg-yellow-950 p-2">
                <h3 className="w-full text-xl text-white font-semibold">{name} ({timestamps.length})</h3>
                <button className="bg-blue-400 p-3 inline-flex items-center justify-center rounded-[50%] h-5 w-5" onClick={toggleExpanded}>{expanded ? '-' : '+'}</button>
            </div>
        </div>
    )
}