import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, LineController, LineElement, LogarithmicScale, PointElement, TimeScale } from "chart.js";
import { Line, type ChartProps } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import autocolorPlugin from "chartjs-plugin-autocolors";
import type { DisplayProps } from "../types";

ChartJS.register([
    CategoryScale,
    LineController,
    LineElement,
    LinearScale,
    LogarithmicScale,
    TimeScale,
    PointElement,
    Tooltip,
    autocolorPlugin
]);

const width = window.innerWidth;
const height = window.innerHeight * 0.91;

export function Chart ({ data }: DisplayProps) {
    const chartProps: Omit<ChartProps<"line">, "type"> = {
        width,
        height,
        data: {
            datasets: Object.entries(data).map(([stopName, stopData]) => ({
                label: stopName,
                data: stopData.map((timestamp, index) => ({ x: timestamp, y: index + 1 })),
                spanGaps: true
            }))
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM dd yyyy'
                        }
                    },
                    min: Math.min(...Object.values(data).map(stopData => stopData[0])),
                    max: Math.max(...Object.values(data).map(stopData => stopData.at(-1) ?? 0))
                },
                y: {
                    type: 'logarithmic',
                    min: 1,
                    max: Math.max(...Object.values(data).map(stopData => stopData.length))
                }
            }
        }
    }
    return (
        <div>
            <Line {...chartProps} />
        </div>
    );
}