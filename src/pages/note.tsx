import { useQueryClient } from "react-query"
import { TQuiz } from "../type/quiz"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizItem from "../components/quizItem"
import QuizList from "../components/quizList"
import { useRecoilValue } from "recoil"
import { answerListState } from "../recoil/atoms/quiz"

const Note = () => {
    const cache = useQueryClient()
    const data: TQuiz[] = cache.getQueryData(['quizList']) as TQuiz[]
    const answerList = useRecoilValue(answerListState)
    console.log(data)
    return <div>
        {
            data && data.map((it, idx) => <QuizTemplate key={idx}>
                <QuizHeader
                    category={it.category}
                    difficulty={it.difficulty}
                    question={it.question}
                    type={it.type}></QuizHeader>
                <QuizList
                    step={idx + 1}
                    correctAnswer={it.correct_answer}
                    answers={answerList[idx]}></QuizList>
            </QuizTemplate>)
        }
    </div>
}

export default Note