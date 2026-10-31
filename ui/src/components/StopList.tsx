import { Stop } from "./Stop"
import { Tooltip } from "react-tooltip"

export interface StopListProps {
    stops: Array<[string, number[]]>
}

const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })

export function StopList ({ stops }: StopListProps) {
    return (
        <>
            <div className="flex flex-col flex-wrap h-screen gap-2">
                {stops.map(([ name, timestamps ]) => <Stop name={name} timestamps={timestamps} />)}
            </div>
            <Tooltip id="stop-list" clickable={true} opacity={1.0} border="0.1rem solid black" style={{ pointerEvents: 'auto', borderRadius: '1rem', backgroundColor: '#dcdcdc', color: 'black', fontSize: '1rem', width: '15rem', maxHeight: '20rem', overflowY: 'scroll' }} render={({ activeAnchor }) => {
                const timestamps = activeAnchor?.getAttribute('data-visits')?.split(',')
                return <div>
                    {timestamps && timestamps.map(timestamp => <p>{formatter.format(parseInt(timestamp, 10))}</p>)}
                </div>
            }}/>
        </>
    )
}