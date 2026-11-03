import type { DisplayProps } from "../types";
import { StopList } from "./StopList"

export function StopRanking ({ data }: DisplayProps) {
    const stops = Object.entries(data).sort((a, b) => {
        return b[1].length - a[1].length;
    })
    return (
        <div>
            <StopList stops={stops} />
        </div>
    )
}