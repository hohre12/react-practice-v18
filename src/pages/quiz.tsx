import { useEffect, useState } from "react"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizList from "../components/quizList"
import { useQuery } from "react-query"
import { getQuiz } from "../services/quiz"
import { TQuiz } from "../type/quiz"
import { shuffle } from '../utils/common';

const Quiz = () => {
    const { data, isLoading, isError } = useQuery(['quizList'], getQuiz)

    // store에 들고있어야함
    const [step, setStep] = useState<number>(1)
    const [selectAnswerList, setSelectAnswerList] = useState<string[]>([])
    const [answerList, setAnswerList] = useState<any[]>([])
    const [quiz, setQuiz] = useState<TQuiz | null>(null)
    const isAnswer = selectAnswerList.length === step

    // store에 들고있어야함
    // 정답이 뭔지 알아야함. QuizList에 correct 내려주던가 아니면 string[] -> any[]로 바꿔주던가
    // const answerList: any[] = data.results.map((it:any) => shuffle([it.correct_answer, ...it.incorrect_answers]))
    useEffect(() => {
        if (data && data.results) {
            const newAnswerList = data.results.map((it: any) => shuffle([it.correct_answer, ...it.incorrect_answers]));
            setAnswerList(newAnswerList);
        }
    }, [data])

    useEffect(() => {
        if (data && data.results) { 
            setQuiz(data.results[step - 1])
        }
    }, [step, data])

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>
    
    // 유저 선택 받는 list 만들어서 store로 관리
    // 시간 store로 관리

    const selectAnswer = (val: string) => {
        setSelectAnswerList([val, ...selectAnswerList])
        if(quiz?.correct_answer === val) alert('정답입니다!')
        else alert('오답입니다!')
    }

    const goNextStep = () => {
        if(answerList.length === step) console.log('오답노트로')
        else setStep(step + 1)
    }
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
                        selectAnswer={selectAnswer}
                        answers={answerList[step - 1]}></QuizList>
                </>
            }
            {
                isAnswer && <button onClick={goNextStep}>
                    {
                        answerList.length === step ? '오답노트로' : '다음으로'
                    }
                </button>
            }
        </QuizTemplate>
    </div>
}

export default Quiz