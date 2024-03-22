import { useRecoilValue } from "recoil"
import { quizListState, selectAnswerListState, timeState } from "../recoil/atoms/quiz"
import { Link } from "react-router-dom"



const QuizResult = () => {
    const quizList = useRecoilValue(quizListState)
    const selectAnswerList = useRecoilValue(selectAnswerListState)
    const time = useRecoilValue(timeState)
    
    let rightAnswer: number[] = []
    let wrongAnswer: number[] = []

    for(let i = 0; i < quizList.length; i++) {
        if(selectAnswerList[i] === quizList[i].correct_answer) rightAnswer.push(i)
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