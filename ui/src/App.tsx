import { Chart } from "./components/Chart";
import stopData from "./data/visitsPerStop.json";

export default function App () {
    return <div>
        <Chart data={stopData} />
    </div>
}