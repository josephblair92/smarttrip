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

    return <input type="file" className="file:bg-gray-300 file:border-gray-400 file:border-1 file:px-2 file:py-1 file:mr-2" multiple accept=".csv" id="filepicker" onChange={handleFileUpload} />
}