import { Stop } from "./Stop"

export interface StopListProps {
    stops: Array<[string, number[]]>
}

export function StopList ({ stops }: StopListProps) {
    return (
        <div className="flex flex-col flex-wrap h-screen gap-2">
            {stops.map(([ name, timestamps ]) => <Stop name={name} timestamps={timestamps} />)}
        </div>
    )
}