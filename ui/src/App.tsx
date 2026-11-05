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
    const [stopData, setStopData] = useState(localData ?? {})
    const DisplayComponent = displayComponents[selectedDisplay]
    return <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-3 h-10 bg-black text-white">
            <p className="font-bold">Select display mode:</p>
            <input type="radio" id="chart" value="chart" checked={selectedDisplay === "chart"} onChange={() => setSelectedDisplay("chart")} />
            <label htmlFor="chart">Chart</label>
            <input type="radio" id="list" value="list" checked={selectedDisplay === "list"} onChange={() => setSelectedDisplay("list")} />
            <label htmlFor="chart">List</label>
            <input type="radio" id="map" value="map" checked={selectedDisplay === "map"} onChange={() => setSelectedDisplay("map")} />
            <label htmlFor="chart">Map</label>
        </div>
        <DisplayComponent data={stopData} />
    </div>
}