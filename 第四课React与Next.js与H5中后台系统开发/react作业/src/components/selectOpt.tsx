import { Button } from '@/components/ui/button'

interface SelectOptProps {
    text: string
    onClick?: () => void
    disabled?: boolean
    isSelected?: boolean
    isCorrect?: boolean
}

export default function SelectOpt({
    text,
    onClick,
    disabled,
    isSelected,
    isCorrect
}: SelectOptProps) {
    let stateClass = 'bg-sky-400 hover:bg-sky-500'
    if (isCorrect) stateClass = 'bg-emerald-400'
    else if (isSelected && !isCorrect) stateClass = 'bg-red-400'

    return (
        <Button
            className={`w-full text-left my-2 py-3 px-4 rounded-md shadow-sm transition-colors cursor-pointer ${stateClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}
