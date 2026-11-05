import { Chart } from "./components/Chart";
import { StopRanking } from "./components/StopRanking";
import { Map } from "./components/Map";
import { useState } from "react";
import { DisplayTypes, type DisplayProps, type DisplayType } from "./types";

const localData = import.meta.glob('./data/visitsPerStop.json', { eager: true, import: 'default' })?.['./data/visitsPerStop.json'];

const displayComponents: Record<DisplayType, React.FC<DisplayProps>> = {
    [DisplayTypes.CHART]: Chart,
    [DisplayTypes.LIST]: StopRanking,
    [DisplayTypes.MAP]: Map
}

export default function App () {
    const [selectedDisplay, setSelectedDisplay] = useState<DisplayType>(DisplayTypes.LIST)
    // @ts-expect-error TS(2345) should be allowed because the default state is no visit history
    const [stopData, setStopData] = useState<Record<string, number[]>>(localData ?? {})
    const DisplayComponent = displayComponents[selectedDisplay]
    return <div className="flex flex-col gap-4">
        <div className="flex justify-between p-2 h-14 bg-black text-white">
            <div className="flex items-center gap-2">
                <p className="font-bold">Select display mode:</p>
                <input type="radio" id="chart" value="chart" checked={selectedDisplay === "chart"} onChange={() => setSelectedDisplay("chart")} />
                <label htmlFor="chart">Chart</label>
                <input type="radio" id="list" value="list" checked={selectedDisplay === "list"} onChange={() => setSelectedDisplay("list")} />
                <label htmlFor="chart">List</label>
                <input type="radio" id="map" value="map" checked={selectedDisplay === "map"} onChange={() => setSelectedDisplay("map")} />
                <label htmlFor="chart">Map</label>
            </div>
            <div className="flex gap-2 items-center">
                <button className="bg-blue-600 p-2 rounded-md">Import Data</button>
                <button className="bg-blue-600 p-2 rounded-md">Generate Random Data</button>
            </div>
        </div>
        <DisplayComponent data={stopData} />
    </div>
}