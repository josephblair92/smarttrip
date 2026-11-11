import { Chart } from "./components/Chart"
import { Map } from "./components/Map"
import { useState } from "react"
import {
  DisplayTypes,
  type DisplayProps,
  type DisplayType,
  type StopData
} from "./types"
import { DataInputModal } from "./components/DataInputModal"
import { StopList } from "./components/StopList"
import stopLines from "./data/stopLines.json"
import { Toggle } from "./components/Toggle"

const localData = import.meta.glob("./data/visitsPerStop.json", {
  eager: true,
  import: "default"
})?.["./data/visitsPerStop.json"]

const displayComponents: Record<DisplayType, React.FC<DisplayProps>> = {
  [DisplayTypes.CHART]: Chart,
  [DisplayTypes.LIST]: StopList,
  [DisplayTypes.MAP]: Map
}

const displayTypes: DisplayType[] = ["chart", "list", "map"]
const toTitleCase = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase()

const generateRandomData = () => {
  const stopIds = Object.keys(stopLines)
  const timeRange = 1000 * 60 * 60 * 24 * 30
  const startTime = new Date().getTime() - timeRange
  const visitDistribution = [
    100, 75, 50, 40, 37, 30, 25, 20, 19, 17, 15, 15, 12, 10, 9, 9, 7, 6, 5, 5,
    4, 2, 2, 1, 1
  ]
  return visitDistribution.reduce((acc, numVisits) => {
    const index = Math.floor(Math.random() * stopIds.length)
    const [stopId] = stopIds.splice(index, 1)
    const timestamps = Array.from(
      { length: numVisits },
      () => Math.floor(Math.random() * timeRange) + startTime
    )
    timestamps.sort()
    acc[stopId] = timestamps
    return acc
  }, {} as StopData)
}

export default function App() {
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayType>(
    DisplayTypes.LIST
  )
  // @ts-expect-error TS(2345) should be allowed because the default state is no visit history
  const [stopData, setStopData] = useState<StopData>(localData ?? {})
  const [isInputModalOpen, setIsInputModalOpen] = useState(false)
  const DisplayComponent = displayComponents[selectedDisplay]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between p-2 h-14 bg-black text-white">
        <div className="flex items-center gap-2">
          <p className="font-bold">Select display mode:</p>
          <Toggle
            dark
            options={displayTypes.map(type => ({
              id: type,
              label: toTitleCase(type)
            }))}
            currentValue={selectedDisplay}
            onChange={value => setSelectedDisplay(value as DisplayType)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsInputModalOpen(true)}>Import Data</button>
          <button onClick={() => setStopData(generateRandomData)}>
            Generate Random Data
          </button>
        </div>
      </div>
      <DisplayComponent data={stopData} />
      <DataInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSaveData={setStopData}
      />
    </div>
  )
}
