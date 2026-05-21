import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import QuestionCard from '../components/QuestionCard'
import type { Question } from '../types'

function fixText(text: string) {
  const el = document.createElement('textarea')
  el.innerHTML = text
  return el.value
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=15&type=multiple')
      .then(res => res.json())
      .then(data => {
        if (data.response_code === 0) {
          setQuestions(data.results.map((q: Question) => ({
            ...q,
            question: fixText(q.question),
            correct_answer: fixText(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(fixText)
          })))
        }
      })
  }, [])

  const handleAnswer = async (correct: boolean) => {
    const newScore = correct ? score + 1 : score
    setScore(newScore)

    if (index + 1 >= questions.length) {
      const userId = localStorage.getItem('userId')
      await axios.put(`http://localhost:5000/api/users/${userId}`, { score: newScore })
      setDone(true)
    } else {
      setIndex(index + 1)
    }
  }

  if (done) return (
    <div className="quiz__done">
      <h2>Klart! Du fick {score} av {questions.length} rätt</h2>
      <button onClick={() => navigate('/highscores')}>Se highscores</button>
    </div>
  )

  if (questions.length === 0) return <p>Laddar frågor...</p>

  return (
    <div className="quiz">
      <p>Fråga {index + 1} av {questions.length}</p>
      <QuestionCard key={index} question={questions[index]} onAnswer={handleAnswer} />
    </div>
  )
}

export default Quiz
