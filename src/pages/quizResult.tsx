import { useRecoilValue } from "recoil"
import { answerListState, selectAnswerListState, timeState } from "../recoil/atoms/quiz"
import { useQueryClient } from "react-query"
import { TQuiz } from "../type/quiz"
import { Link } from "react-router-dom"



const QuizResult = () => {
    const cache = useQueryClient()
    const answerList = useRecoilValue(answerListState)
    const selectAnswerList = useRecoilValue(selectAnswerListState)
    const time = useRecoilValue(timeState)

    const data: TQuiz[] = cache.getQueryData(['quizList']) as TQuiz[]
    let rightAnswer: number[] = []
    let wrongAnswer: number[] = []

    for(let i = 0; i < data.length; i++) {
        if(selectAnswerList[i] === data[i].correct_answer) rightAnswer.push(i)
        else wrongAnswer.push(i)
    }
    return <div>
        <h1>결과</h1>
        <h2>경과시간 : {time} 초</h2>
        <h2>정답갯수 : {rightAnswer?.length} 개</h2>
        <h2>오답갯수 : {wrongAnswer?.length} 개</h2>
        <Link to='/note'>오답노트 가기</Link>
    </div>
}

export default QuizResult