import type { CSSProperties } from "react"
import { Stop } from "./Stop"
import { Tooltip } from "react-tooltip"
import type { DisplayProps } from "../types"

export interface StopListProps {
    stops: Array<[string, number[]]>
}

const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })
const tooltipStyles: CSSProperties = {
    borderRadius: '1rem',
    backgroundColor: '#dcdcdc',
    color: 'black',
    fontSize: '1rem',
    width: '15rem',
    maxHeight: '20rem',
    overflowX: 'hidden',
    boxShadow: '5px 5px 5px 1px rgb(0 0 0 / 40%)'
}

const renderFn = ({ activeAnchor }: { activeAnchor: Element | null }) => {
    const timestamps = activeAnchor?.getAttribute('data-visits')?.split(',')
    return <div>
        {timestamps && timestamps.map(timestamp => <p>{formatter.format(parseInt(timestamp, 10))}</p>)}
    </div>
}

export function StopList ({ data }: DisplayProps) {
    const stops = Object.entries(data).sort((a, b) => {
        return b[1].length - a[1].length;
    })
    return (
        <>
            <div className="flex flex-col flex-wrap h-[93vh] p-2 gap-2 overflow-x-scroll">
                {stops.map(([ name, timestamps ], index) => <Stop name={name} timestamps={timestamps} rank={index + 1} />)}
            </div>
            <Tooltip
                id="stop-list"
                clickable
                noArrow
                opacity={1.0}
                border="0.1rem solid gray"
                style={tooltipStyles}
                render={renderFn}
            />
        </>
    )
}