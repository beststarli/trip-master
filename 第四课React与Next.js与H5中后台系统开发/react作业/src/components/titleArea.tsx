import React from 'react'

interface TitleAreaProps {
    score: number
}

export default function TitleArea({
    score
}: TitleAreaProps) {
    return (
        <div className='h-[20%] w-full bg-gray-200 p-4 space-y-4 flex flex-col items-center '>
            <h1 className='font-bold text-5xl text-cyan-500 italic'>React Quiz</h1>
            <div>
                <span className='text-2xl font-semibold text-cyan-300'>
                    Your Score: {score.toString()}
                </span>
            </div>
        </div>
    )
}
