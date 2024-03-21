import { useQueryClient } from "react-query"
import { TQuiz } from "../type/quiz"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizItem from "../components/quizItem"

const Note = () => {
    const cache = useQueryClient()
    const data: TQuiz[] = cache.getQueryData(['quizList']) as TQuiz[]
    // 오답노트 필요 변수
    // data, answerList, selectAnswerList
    // 헤더에 data 넣어주고, answerList로 item 그려주고, selectAnswerList의 text 내려주고, 정답 내려주고
    return <div>
        {
            data && data.map(it => <QuizTemplate>
                <QuizHeader
                    category={it.category}
                    difficulty={it.difficulty}
                    question={it.question}
                    type={it.type}></QuizHeader>
                {/* <QuizList
                    selectAnswer={selectAnswer}
                    answers={answerList[step - 1]}></QuizList> */}
            </QuizTemplate>)
        }
    </div>
}

export default Note