import QuizTemplate from "../components/quiz/quizTemplate"
import QuizHeader from "../components/quiz/quizHeader"
import { useRecoilValue } from "recoil"
import { answerListState, quizListState } from "../recoil/atoms/quiz"
import QuizItem from "../components/quiz/quizItem"
import { QuizListStyled } from "../styles/quiz.style"


const Note = () => {
    const quizList = useRecoilValue(quizListState)
    const answerList = useRecoilValue(answerListState)
    return <div>
        {
            quizList && quizList.map((it, idx) => <QuizTemplate key={idx}>
                <QuizHeader
                    category={it.category}
                    difficulty={it.difficulty}
                    question={it.question}></QuizHeader>
                <QuizListStyled>
                    {
                        answerList[idx]?.map((itt: string, id: number) => <QuizItem key={id} text={itt} step={idx + 1} correctAnswer={it.correct_answer}></QuizItem>)
                    }
                </QuizListStyled>
            </QuizTemplate>)
        }
    </div>
}

export default Note