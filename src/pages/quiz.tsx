import { useEffect, useState } from "react"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizList from "../components/quizList"
import { useQuery } from "react-query"
import { getQuiz } from "../services/quiz"
import { TQuiz, TQuizListItem } from "../type/quiz"
import { shuffle } from '../utils/common';

const Quiz = () => {
    const { data, isLoading, isError } = useQuery(['quizList'], getQuiz)

    // store에 들고있어야함
    const [step, setStep] = useState<number>(1)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>

    const quiz: TQuiz = data.results[step - 1]

    // store에 들고있어야함
    // 정답이 뭔지 알아야함. QuizList에 correct 내려주던가 아니면 string[] -> any[]로 바꿔주던가
    const answerList = data.results.map((it:any) => shuffle([it.correct_answer, ...it.incorrect_answers]))
    // 유저 선택 받는 list 만들어서 store로 관리
    // 시간 store로 관리

    console.log(answerList)
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