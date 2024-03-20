import { useEffect, useState } from "react"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizList from "../components/quizList"
import { useQuery } from "react-query"
import { getQuiz } from "../services/quiz"
import { TQuiz } from "../type/quiz"

const Quiz = () => {
    const { data, isLoading, isError } = useQuery(['quizList'], getQuiz)
    const [step, setStep] = useState<number>(1)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>

    const quiz: TQuiz = data.results[step - 1]
    return <div>
        <h1>퀴즈 페이지</h1>
        {/* <div>시간</div> */}
        
        <QuizTemplate>
            {
                quiz && <>
                    <QuizHeader
                        category={quiz.category}
                        difficulty={quiz.difficulty}
                        question={quiz.question}
                        type={quiz.type}></QuizHeader>
                    <QuizList
                        correct_answer={quiz.correct_answer}
                        incorrect_answers={quiz.incorrect_answers}></QuizList>
                </>
            }
        </QuizTemplate>
    </div>
}

export default Quiz