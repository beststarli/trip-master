import SelectOpt from './selectOpt'

interface Option {
    id: string
    text: string
}

interface Question {
    id?: number
    question: string
    options: Option[]
    correctOption: number
}

interface QuizAreaProps {
    question: Question | null
    questionIndex: number
    total: number
    selectedOptionId: string | null
    onSelect: (optionId: string) => void
}

export default function QuizArea({ question, questionIndex, total, selectedOptionId, onSelect }: QuizAreaProps) {
    if (!question) {
        return (
            <div className='p-8'>Loading quiz...</div>
        )
    }

    const correctId = question.options[question.correctOption]?.id

    return (
        <div className='h-[70%] w-full bg-gray-100 flex items-center justify-center p-4'>
            <div className='h-[90%] w-[60%] p-4 bg-white shadow-md rounded-md' >

                <div className='border rounded p-4 mb-4 space-y-2'>
                    <div className='text-center font-medium'>{question.question}</div>
                    <div className='text-center text-sm text-gray-500'>Question: {questionIndex + 1} / {total}</div>
                </div>

                <div>
                    {question.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id
                        const isCorrect = selectedOptionId !== null && opt.id === correctId
                        return (
                            <SelectOpt key={opt.id} text={opt.text} onClick={() => onSelect(opt.id)} disabled={selectedOptionId !== null} isSelected={isSelected} isCorrect={isCorrect} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
