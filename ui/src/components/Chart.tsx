import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, LineController, LineElement, LogarithmicScale, PointElement, TimeScale } from "chart.js";
import { Line, type ChartProps } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import autocolorPlugin from "chartjs-plugin-autocolors";

export interface ChartComponentProps {
    data: Record<string, number[]>
}

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

export function Chart ({ data }: ChartComponentProps) {
    const chartProps: Omit<ChartProps<"line">, "type"> = {
        width: window.innerWidth,
        height: window.innerHeight,
        data: {
            datasets: Object.entries(data).map(([stopName, stopData]) => ({
                label: `${stopName} (${stopData.length})`,
                data: stopData.map((timestamp, index) => ({ x: timestamp, y: index })),
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
                    min: Math.min(...Object.values(data).map(stopData => stopData.length)),
                    max: Math.max(...Object.values(data).map(stopData => stopData.length))
                }
            }
        }
    }
    return <Line {...chartProps} />
}