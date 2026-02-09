import { useEffect, useState } from 'react'
import './App.css'
import QuizArea from './components/quizArea'
import TitleArea from './components/titleArea'
import FooterArea from './components/footerArea'

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

function shuffle<T>(arr: T[]) {
	const a = arr.slice()
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

function App() {
	const [questions, setQuestions] = useState<Question[] | null>(null)
	const [score, setScore] = useState<number>(0)
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [answered, setAnswered] = useState<boolean>(false)
	const [allAnswered, setAllAnswered] = useState<boolean>(false)
	const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

	const total = questions ? questions.length : 0
	const currentQuestion = questions && currentIndex < total ? questions[currentIndex] : null

	useEffect(() => {
		fetch('/quizJSON.json')
			.then((res) => res.json())
			.then((data: Question[]) => {
				const selected10 = shuffle(data).slice(0, 10)
				setQuestions(selected10)
			})
			.catch(() => setQuestions([]))
	}, [])

	const handleSelect = (optionId: string) => {
		if (answered || !questions) return

		setSelectedOptionId(optionId)
		setAnswered(true)

		const correctId = questions[currentIndex].options[questions[currentIndex].correctOption]?.id

		if (optionId === correctId) {
			setScore((s) => s + 1)
		}

		if (currentIndex === (questions.length - 1)) {
			setAllAnswered(true)
			
			setTimeout(() => {
				setCurrentIndex((i) => i + 1)
				setAnswered(false)
				setSelectedOptionId(null)
			}, 700)
		}
	}

	const handleNext = () => {
		if (!questions) return

		const next = currentIndex + 1

		if (next >= questions.length) {
			setAllAnswered(true)
			setAnswered(false)
			setSelectedOptionId(null)
			setCurrentIndex(next)
			return
		}

		setCurrentIndex(next)
		setAnswered(false)
		setSelectedOptionId(null)
	}

	const handleRestart = () => {
		if (!questions) return

		const reshuffled = shuffle(questions).slice(0, 10)
		
		setQuestions(reshuffled)
		setCurrentIndex(0)
		setScore(0)
		setSelectedOptionId(null)
		setAnswered(false)
		setAllAnswered(false)
	}

	return (
		<div className='h-screen w-screen bg-cyan-100 items-center justify-center flex flex-col'>
			<TitleArea score={score} />

			{currentQuestion ? (
				<QuizArea
					question={currentQuestion}
					questionIndex={currentIndex}
					total={total}
					selectedOptionId={selectedOptionId}
					onSelect={handleSelect}
				/>
			) : (
				<div className='h-[70%] w-full flex items-center justify-center p-4'>
					{questions === null ? (
						<div>Loading...</div>
					) : (
						<div className='h-[50%] w-[60%] p-8 bg-white shadow-md rounded-md text-center'>
							<h2 className='text-2xl font-bold'>作答完毕</h2>
							<p className='mt-4'>分数是: {score} / {total}</p>
						</div>
					)}
				</div>
			)}

			<FooterArea
				answered={answered}
				allAnswered={allAnswered}
				onNext={handleNext}
				onRestart={handleRestart}
			/>
		</div>
	)
}

export default App