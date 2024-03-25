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
            quizList && quizList.map((quiz, idx) => <QuizTemplate key={idx}>
                <QuizHeader
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    question={quiz.question}></QuizHeader>
                <QuizListStyled>
                    {
                        answerList[idx]?.map((answer: string, id: number) => <QuizItem key={id} text={answer} step={idx + 1} correctAnswer={quiz.correct_answer}></QuizItem>)
                    }
                </QuizListStyled>
            </QuizTemplate>)
        }
    </div>
}

export default Note