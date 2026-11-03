import { Chart } from "./components/Chart";
import { StopRanking } from "./components/StopRanking";
import { Map } from "./components/Map";
import stopData from "./data/visitsPerStop.json";

export default function App () {
    return <div>
        {/* <Chart data={stopData} /> */}
        {/* <StopRanking data={stopData} /> */}
        <Map data={stopData} />
    </div>
}