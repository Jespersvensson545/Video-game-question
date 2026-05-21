import { useState, useMemo } from 'react'
import type { Question } from '../types.ts'

interface Props {
  question: Question
  onAnswer: (correct: boolean) => void
}

const QuestionCard = ({ question, onAnswer }: Props) => {
  const [valt, setValt] = useState<string | null>(null)

  const alternativ = useMemo(() =>
    [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5)
  , [question])

  const handleClick = (alt: string) => {
    if (valt) return
    setValt(alt)
    setTimeout(() => {
      onAnswer(alt === question.correct_answer)
    }, 1000)
  }

  const getClass = (alt: string) => {
    if (!valt) return ""
    if (alt === question.correct_answer) return "correct"
    if (alt === valt) return "wrong"
    return ""
  }

  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <ul>
        {alternativ.map((alt, i) => (
          <li key={i}>
            <button className={getClass(alt)} onClick={() => handleClick(alt)}>
              {alt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuestionCard
