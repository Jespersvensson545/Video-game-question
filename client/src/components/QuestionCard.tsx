import { Question } from "../types";

interface Props {
    question: Question
    onAnswer: (correct: boolean) => void
}

const QuestionCard = ({ question, onAnswer }: Props) => {
    const alternativ = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5)

 return (
    <div className="question-card">
        <h3>{question.question}</h3>
        <ul>
            {alternativ.map((alt, i) => (
                <button onClick={() => onAnswer(alt === question.correct_answer)}>
                    {alt}
                </button>
            ))}
        </ul>
    </div>
 )
}

export default QuestionCard
