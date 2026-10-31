import type { CSSProperties } from "react"
import { Stop } from "./Stop"
import { Tooltip } from "react-tooltip"

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
    overflowY: 'scroll',
    overflowX: 'hidden'
}

const renderFn = ({ activeAnchor }: { activeAnchor: Element | null }) => {
    const timestamps = activeAnchor?.getAttribute('data-visits')?.split(',')
    return <div>
        {timestamps && timestamps.map(timestamp => <p>{formatter.format(parseInt(timestamp, 10))}</p>)}
    </div>
}

export function StopList ({ stops }: StopListProps) {
    return (
        <>
            <div className="flex flex-col flex-wrap h-screen gap-2">
                {stops.map(([ name, timestamps ], index) => <Stop name={name} timestamps={timestamps} rank={index + 1} />)}
            </div>
            <Tooltip
                id="stop-list"
                clickable
                opacity={1.0}
                border="0.1rem solid black"
                style={tooltipStyles}
                render={renderFn}
            />
        </>
    )
}