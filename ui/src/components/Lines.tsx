export interface LinesProps {
    lines: string[]
}

const lineColorClasses = {
    rd: 'bg-red-400',
    or: 'bg-orange-400',
    yl: 'bg-yellow-400',
    gr: 'bg-green-400',
    sv: 'bg-gray-400',
    bl: 'bg-blue-400'
}

export function Lines ({ lines }: LinesProps) {
    return (
        <div className="flex gap-1">
            {lines.map(line => <div className={`w-5 h-5 rounded-[50%] ${lineColorClasses[line as keyof typeof lineColorClasses]}`} />)}
        </div>
    )
}