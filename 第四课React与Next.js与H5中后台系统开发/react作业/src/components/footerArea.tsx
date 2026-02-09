import { Button } from './ui/button'

interface FooterAreaProps {
    answered: boolean
    allAnswered: boolean
    onNext: () => void
    onRestart: () => void
}

export default function FooterArea({ answered, allAnswered, onNext, onRestart }: FooterAreaProps) {
    return (
        <div className='h-[10%] w-full bg-gray-200 flex items-center justify-center p-4'>
            <div className='space-x-2'>
                { (!answered && !allAnswered) && <span className='text-2xl font-semibold text-amber-500 italic'>请选择一个选项以作答</span>}
                {answered && !allAnswered ? (
                    <Button variant={'outline'} className='cursor-pointer' onClick={onNext}>
                        下一题
                    </Button>
                ) : null}

                {allAnswered ? (
                    <Button variant={'destructive'} className='cursor-pointer' onClick={onRestart}>
                        重新开始
                    </Button>
                ) : null}

            </div>
        </div>
    )
}
