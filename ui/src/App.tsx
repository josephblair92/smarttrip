import { Chart } from "./components/Chart";
import stopData from "./data/visitsPerStop.json";

export default function App () {
    return <div>
        <p className="text-3xl">Test</p>
        <Chart data={stopData} />
    </div>
}