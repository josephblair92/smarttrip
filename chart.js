import { Chart, CategoryScale, LineController, LineElement, LinearScale, PointElement, Colors, Legend, LogarithmicScale, TimeScale } from "chart.js";
import { Canvas } from "skia-canvas";
import fs from 'node:fs/promises'
import 'chartjs-adapter-date-fns'
import autocolorPlugin from "chartjs-plugin-autocolors";

export const generateChart = async (stopCountOverTime) => {
    Chart.register([
        CategoryScale,
        LineController,
        LineElement,
        LinearScale,
        LogarithmicScale,
        TimeScale,
        PointElement,
        Legend,
        // Colors,
        autocolorPlugin
    ]);
    const canvas = new Canvas(2000, 1400);
    const chart = new Chart(canvas, {
        type: 'line',
        data: {
            datasets: Object.entries(stopCountOverTime).map(([stopName, stopData]) => ({
                label: `${stopName} (${stopData.at(-1)[1]})`,
                data: stopData.map(([x, y]) => ({ x, y })),
                spanGaps: true
            }))
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        sort: (a, b, data) => {
                            const aVal = data.datasets[a.datasetIndex].data.at(-1).y;
                            const bVal = data.datasets[b.datasetIndex].data.at(-1).y;
                            return aVal === bVal ? 0 : aVal < bVal ? 1 : -1;
                        }
                    }
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
                    min: Math.min(...Object.values(stopCountOverTime).map(stopData => stopData[0][0])),
                    max: Math.max(...Object.values(stopCountOverTime).map(stopData => stopData[stopData.length - 1][0]))
                },
                y: {
                    type: 'logarithmic',
                    min: Math.min(...Object.values(stopCountOverTime).map(stopData => stopData[stopData.length - 1][1])),
                    max: Math.max(...Object.values(stopCountOverTime).map(stopData => stopData[stopData.length - 1][1]))
                }
            }
        }
    });
    const pngBuffer = await canvas.toBuffer('png', { matte: 'white' });
    await fs.writeFile('chart.png', pngBuffer);
    chart.destroy();
};