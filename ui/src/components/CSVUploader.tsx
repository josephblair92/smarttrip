import type { UploaderProps } from "./DataInputModal";
import { parseFiles } from "../parser"
import type { ChangeEvent } from "react";

export function CSVUploader ({ onChange, setError }: UploaderProps) {

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        const fileLoadOps = []
        if (!files) return
        for (const file of files) {
            fileLoadOps.push(new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    if (e.target?.result) {
                        resolve(e.target.result as string)
                    } else {
                        reject(`could not load file with error: ${e.target?.error}`)
                    }
                }
                reader.readAsText(file)
            }))
        }
        try {
            const loadedFiles = await Promise.all(fileLoadOps)
            const data = await parseFiles(loadedFiles)
            setError(false)
            onChange(data)
        } catch (err) {
            setError(true)
        }
    }

    return <div className="flex flex-col gap-3">
        <input type="file" className="file:bg-gray-300 file:border-gray-400 file:border-1 file:px-2 file:py-1 file:mr-2" multiple accept=".csv" id="filepicker" onChange={handleFileUpload} />
        <div>
            <ol className="list-decimal list-inside">
                <li>Navigate to your WMATA SmartTrip <a href="https://smarttrip.wmata.com/Account/Summary">Account Summary</a>.</li>
                <li>Click the card that you want to download data for.</li>
                <li>Navigate to <b>History</b> &gt; <b>Use History</b> on the right side of the screen.</li>
                <li>Hit F12 on your keyboard to open the browser console. Open the <b>Console</b> tab if necessary.</li>
                <li>In a separate tab, open the download script <a href="https://raw.githubusercontent.com/josephblair92/smarttrip/refs/heads/main/cli/script/download.js">here</a> and copy its contents.</li>
                <li>In the original tab, paste the contents of the script into the console.</li>
                <li>Note the value of <span className="font-mono">NUM_MONTHS</span> on the first line. This determines how many months backward of data to download, not including the current month. The default value of 25 reflects the maximum that WMATA stores before expiring. You can reduce this value on subsequent runs to only include new data since your last download.</li>
                <li>Hit Enter to run the script. It generates download URLs for each month of data, in CSV format. The script tries to open the URLs with <span className="font-mono">_blank</span>, but if your browser or browser extensions prevent this, they are also printed as links that you can click to initiate each download. Make sure you get all requested months of data.</li>
                <li>Repeat from Step 2 for any additional cards.</li>
                <li>Click <b>Choose Files</b> above these instructions and select all of the files you downloaded. Confirm expected results in the status bar and then click Save.</li>
            </ol>
        </div>
    </div>
}