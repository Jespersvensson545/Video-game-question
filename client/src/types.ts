export interface User {
  id: string
  name: string
  score: number
  image: string | null
}

export interface Question {
  question: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: string
}
