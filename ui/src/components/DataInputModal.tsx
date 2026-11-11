import { useEffect, useRef, useState } from "react"
import type { StopData } from "../types"
import { Toggle } from "./Toggle"
import { CSVUploader } from "./CSVUploader"
import { JSONUploader } from "./JSONUploader"

export interface DataInputModalProps {
  isOpen: boolean
  onClose: () => void
  onSaveData: (data: StopData) => void
}

export interface UploaderProps {
  onChange: (data: StopData) => void
  setError: (uploadError: boolean) => void
}

export function DataInputModal({
  isOpen,
  onClose,
  onSaveData
}: DataInputModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [parseError, setParseError] = useState(false)
  const [importMode, setImportMode] = useState<string>("csv")
  const [loadedData, setLoadedData] = useState<StopData>()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const onCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onClose()
  }

  if (!isOpen) return <></>

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <dialog
        ref={dialogRef}
        onCancel={onCancel}
        className="flex flex-col m-auto w-200 h-150 gap-3 p-4 rounded-lg border-1 border-gray-500 shadow-xl bg-gray-200 backdrop:bg-black/50"
      >
        <Toggle
          options={[
            { id: "csv", label: "Parse CSV files (default)" },
            { id: "parsed", label: "Import pre-parsed JSON (advanced)" }
          ]}
          currentValue={importMode}
          onChange={setImportMode}
        />
        <div className="flex-grow">
          {importMode === "csv" ? (
            <CSVUploader onChange={setLoadedData} setError={setParseError} />
          ) : (
            <JSONUploader onChange={setLoadedData} setError={setParseError} />
          )}
        </div>
        <div className="flex justify-between items-center">
          {parseError ? (
            <span className="text-red-600">Error parsing data.</span>
          ) : loadedData ? (
            <span className="text-green-600">
              {`Loaded ${Object.values(loadedData).flat().length} visits across ${Object.keys(loadedData).length} stations.`}
            </span>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button onClick={onClose}>Close</button>
            <button
              onClick={() => {
                if (!loadedData) return
                onSaveData(loadedData)
                onClose()
              }}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
