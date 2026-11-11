import { parse } from "csv-parse/browser/esm/sync"
import moment from "moment-timezone"

const ignoreTypes = [
  "Threshold Autoload",
  "Directed Autoload",
  "Cancel Threshold Autoload",
  "Setup Threshold Autoload",
  "Sale"
]
const stationNameOverrides = {
  "W Falls Church": "West Falls Church",
  "E Falls Church": "East Falls Church",
  "King St 2nd Ent": "King St",
  "Nat Airport N": "National Airport",
  "Nat Airport S": "National Airport",
  "Rosslyn East": "Rosslyn",
  "Dupont Circle S": "Dupont Circle",
  "Dupont Circle N": "Dupont Circle",
  "Farragut N SE": "Farragut North",
  "Farragut N NE": "Farragut North",
  "Farragut N NW": "Farragut North",
  "Farragut W E": "Farragut West",
  "Farragut W W": "Farragut West",
  "McPherson Sq E": "McPherson Sq",
  "McPherson Sq W": "McPherson Sq",
  "Metro Center E": "Metro Center",
  "Metro Center N": "Metro Center",
  "Metro Center S": "Metro Center",
  "Metro Center W": "Metro Center",
  "Gal Pl-Chntwn N": "Gallery Place",
  "Gal Plc-Chntn W": "Gallery Place",
  "Gal Plc-Chntn E": "Gallery Place",
  "Smithsonian N": "Smithsonian",
  "Smithsonian S": "Smithsonian",
  "L'Enfant Plza W": "L'Enfant Plaza",
  "L'Enfant Plza E": "L'Enfant Plaza",
  "Capitol S": "Capitol South",
  "Stad-Armory N": "Stadium-Armory",
  "Stad-Armory S": "Stadium-Armory",
  "U St-Cardozo E": "U Street",
  "U St-Cardozo W": "U Street",
  "Shaw-Hwrd U N": "Shaw",
  "Shaw-Hwrd U S": "Shaw",
  "Navy Yard E": "Navy Yard",
  "Anacostia N": "Anacostia",
  "Anacostia S": "Anacostia",
  "Judiciary Sq E": "Judiciary Square",
  "Judiciary Sq W": "Judiciary Square",
  "Union Stn N": "Union Station",
  "Union Stn S": "Union Station",
  "NoMa Gallaudet North": "NoMa",
  "NoMa Gallaudet South": "NoMa",
  "New York Ave": "NoMa",
  "New York Ave 2nd": "NoMa",
  "Silver Spring S": "Silver Spring",
  "Silver Spring N": "Silver Spring"
}

interface TripEvent {
  time: string
  timestamp: number
  description: string
  operator: string
  entry: string
  exit: string
}

interface StopVisit {
  name: string
  timestamp: number
}

export const parseFiles = async (files: string[]) => {
  const records: TripEvent[] = []
  for (const file of files) {
    const parser: any[] = parse(file, { columns: true })
    for (const record of parser) {
      if (ignoreTypes.includes(record.Description)) {
        continue
      }
      if (!["Entry", "Exit", "Transfer"].includes(record.Description)) {
        console.log(record.Description)
      }
      records.push({
        time: record.Time,
        timestamp: moment
          .tz(record.Time, "MM/DD/YY hh:mm A", "America/New_York")
          .unix(),
        description: record.Description,
        operator: record.Operator,
        entry: record["Entry Location/ Bus Route"],
        exit: record["Exit Location"]
      })
    }
  }
  records.sort((a, b) => a.timestamp - b.timestamp)

  const trips = []
  let startIndex = 0
  records.forEach((record, index) => {
    if (record.description === "Entry" && index > 0) {
      trips.push({
        stops: records.slice(startIndex, index),
        duration:
          (records[index - 1].timestamp - records[startIndex].timestamp) / 60
      })
      startIndex = index
    }
  })
  trips.push({
    stops: records.slice(startIndex),
    duration:
      (records[records.length - 1].timestamp - records[startIndex].timestamp) /
      60
  })
  const busRouteCount: Record<string, number> = {}
  const railStopCount: Record<string, number> = {}
  const stopCountOverTime: Record<string, number[]> = {}
  for (const trip of trips) {
    const railStops = []
    for (const stop of trip.stops) {
      if (stop.operator === "Metrorail") {
        railStops.push(stop)
      } else if (stop.operator === "Metrobus") {
        busRouteCount[stop.entry] = (busRouteCount[stop.entry] || 0) + 1
      }
    }
    const stopsToAdd: StopVisit[] = []
    railStops.forEach(stop => {
      let stopName
      if (stop.entry.length && !stop.exit.length) {
        stopName = stop.entry
      } else if (stop.exit.length && !stop.entry.length) {
        stopName = stop.exit
      } else if (
        stop.entry.length &&
        stop.exit.length &&
        stop.description === "Exit"
      ) {
        stopName = stop.exit
      } else {
        console.log(stop)
      }
      if (!stopName) return
      if (stationNameOverrides[stopName as keyof typeof stationNameOverrides]) {
        stopName =
          stationNameOverrides[stopName as keyof typeof stationNameOverrides]
      }
      stopsToAdd.push({
        name: stopName,
        timestamp: stop.timestamp * 1000
      })
    })
    for (const stop of stopsToAdd) {
      railStopCount[stop.name] = (railStopCount[stop.name] || 0) + 1
      if (!stopCountOverTime[stop.name]) {
        stopCountOverTime[stop.name] = []
      }
      stopCountOverTime[stop.name].push(stop.timestamp)
    }
  }
  return stopCountOverTime
}
