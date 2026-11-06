import { useEffect, useRef, useState } from "react"
import stopLines from "../data/stopLines.json"

export interface DataInputModalProps {
    isOpen: boolean
    onClose: () => void
    onSaveData: (data: Record<string, number[]>) => void
}

export function DataInputModal ({ isOpen, onClose, onSaveData }: DataInputModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [parseError, setParseError] = useState(false)

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

    const isValidFormat = (data: any) => {
        const keys = Object.keys(data)
        const values = Object.values(data)
        if (keys.some(stop => !stopLines[stop as keyof typeof stopLines])) {
            return false
        } else if (values.some(value => !Array.isArray(value) || value.some(entry => typeof entry !== "number"))) {
            return false
        }
        return true
    }

    const saveData = () => {
        const textarea = inputRef.current
        if (!textarea) return
        try {
            const data = JSON.parse(textarea.value)
            if (!isValidFormat(data)) {
                setParseError(true)
            } else {
                setParseError(false)
                onSaveData(data)
                onClose()
            }
        } catch (e) {
            setParseError(true)
        }
    }

    if (!isOpen) return <></>

    return <div className="flex h-screen w-screen items-center justify-center">
        <dialog ref={dialogRef} onCancel={onCancel} className="flex flex-col m-auto w-200 h-150 gap-3 p-4 rounded-lg border-1 border-gray-500 shadow-xl bg-gray-300 backdrop:bg-black/50">
            <textarea ref={inputRef} className="bg-white rounded-md grow p-2" placeholder="Enter trip data from visitsPerStop.json file output from parser CLI..." />
            <div className="flex justify-between items-center">
                <span className="text-red-600">{parseError ? 'Error parsing data.' : ''}</span>
                <div className="flex gap-2">
                    <button className="bg-blue-600 p-2 rounded-md text-white border-blue-700 border-1" onClick={onClose}>Close</button>
                    <button className="bg-blue-600 p-2 rounded-md text-white border-blue-700 border-1" onClick={saveData}>Save</button>
                </div>
            </div>
        </dialog>
    </div>
}