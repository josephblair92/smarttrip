import type { UploaderProps } from "./DataInputModal"
import stopLines from "../data/stopLines.json"
import type { ChangeEvent } from "react"

export function JSONUploader({ onChange, setError }: UploaderProps) {
  const isValidFormat = (data: any) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    if (keys.some(stop => !stopLines[stop as keyof typeof stopLines])) {
      return false
    } else if (
      values.some(
        value =>
          !Array.isArray(value) ||
          value.some(entry => typeof entry !== "number")
      )
    ) {
      return false
    }
    return true
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (!file) return
    const reader = new FileReader()
    const fileLoad = new Promise<string>((resolve, reject) => {
      reader.onload = e => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        } else {
          reject(`could not load file with error: ${e.target?.error}`)
        }
      }
    })
    reader.readAsText(file)
    try {
      const loadedFileStr = await fileLoad
      const data = JSON.parse(loadedFileStr)
      if (!isValidFormat(data)) {
        setError(true)
      } else {
        setError(false)
        onChange(data)
      }
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        className="file:bg-gray-300 file:border-gray-400 file:border-1 file:px-2 file:py-1 file:mr-2"
        accept=".json"
        id="filepicker"
        onChange={handleFileUpload}
      />
      <div>
        <ol className="list-decimal list-inside">
          <li>
            If necessary, follow the steps from the CSV tab to download your
            SmartTrip data from WMATA, but do not upload the files.
          </li>
          <li>
            If necessary, install{" "}
            <a href="https://nodejs.org/en/download">Node</a> version 26.
          </li>
          <li>
            Clone the{" "}
            <a href="https://github.com/josephblair92/smarttrip">
              GitHub repository
            </a>
            .
          </li>
          <li>
            Navigate to the <span className="font-mono">cli</span> directory.
          </li>
          <li>
            Install the project dependencies with{" "}
            <span className="font-mono">npm install</span>.
          </li>
          <li>
            Copy all of your downloaded SmartTrip history files into the{" "}
            <span className="font-mono">data</span> subdirectory.
          </li>
          <li>
            Run the parser script with{" "}
            <span className="font-mono">node ./parser.js</span>.
          </li>
          <li>
            Click <b>Choose File</b> above these instructions and select the{" "}
            <span className="font-mono">visitsPerStop.json</span> file generated
            by the script. Confirm expected results in the status bar and then
            click Save.
          </li>
        </ol>
      </div>
    </div>
  )
}
