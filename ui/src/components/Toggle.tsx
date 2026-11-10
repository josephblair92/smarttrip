export interface ToggleProps {
    options: {
        id: string
        label: string
    }[]
    currentValue: string
    onChange: (selected: string) => void
    dark?: boolean
}

export function Toggle ({ options, currentValue, onChange, dark }: ToggleProps) {

    const darkModeColors = {
        active: 'bg-gray-600',
        inactive: 'bg-gray-800',
        border: 'border-gray-600'
    }

    const lightModeColors = {
        active: 'bg-gray-200',
        inactive: 'bg-gray-400',
        border: 'border-gray-200'
    }

    const colors = dark ? darkModeColors : lightModeColors

    return <div className={`flex rounded-lg ${colors.border} border-1`}>
    {options.map(({ id, label }, index) => (
        <span key={id} className={`flex px-3 py-2 gap-1 items-center ${currentValue === id ? colors.active : colors.inactive} ${index === 0 ? 'rounded-l-lg' : ''} ${index === options.length - 1 ? 'rounded-r-lg' : ''}`}>
            <input
                type="radio"
                id={id}
                value={id}
                checked={currentValue === id}
                onChange={() => onChange(id)}
                className="sr-only"
            />
            <label htmlFor={id}>{label}</label>
        </span>
    ))}
    </div>
}