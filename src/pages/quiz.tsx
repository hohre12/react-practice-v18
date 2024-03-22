import { useEffect, useState } from "react"
import QuizTemplate from "../components/quizTemplate"
import QuizHeader from "../components/quizHeader"
import QuizList from "../components/quizList"
import { useQuery } from "react-query"
import { getQuiz } from "../services/quiz"
import { TQuiz } from "../type/quiz"
import { shuffle } from '../utils/common';
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { answerListState, selectAnswerListState, timeState } from "../recoil/atoms/quiz"

const Quiz = () => {
    const { data, isLoading, isError } = useQuery(['quizList'], getQuiz)
    const [step, setStep] = useState<number>(1)
    
    const [answerList, setAnswerList] = useRecoilState(answerListState)
    const [selectAnswerList, setSelectAnswerList] = useRecoilState(selectAnswerListState)
    const [time, setTime] = useRecoilState(timeState)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            localStorage.removeItem('quizStorage')
            const newAnswerList = data.map((it: any) => shuffle([it.correct_answer, ...it.incorrect_answers]));
            setAnswerList(newAnswerList);
            setSelectAnswerList([])
        }
    }, [data, setAnswerList, setSelectAnswerList])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevSeconds => prevSeconds + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [setTime])

    

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>

    const isAnswer = selectAnswerList.length === step
    const quiz: TQuiz = data[step - 1]
    
    const selectAnswerFunc = (val: string) => {
        setSelectAnswerList([...selectAnswerList, val]) // recoil
        if(quiz?.correct_answer === val) alert('정답입니다!')
        else alert('오답입니다!')
    }

    const goNextStep = () => {
        if(answerList.length === step) {
            navigate('/quizResult')
        }
        else setStep(step + 1)
    }

    return <div>
        <h1>퀴즈 페이지</h1>
        <div>시간: {time}초</div>
        
        <QuizTemplate>
            {
                quiz && <>
                    <QuizHeader
                        category={quiz.category}
                        difficulty={quiz.difficulty}
                        question={quiz.question}
                        type={quiz.type}></QuizHeader>
                    <QuizList
                        selectAnswerFunc={selectAnswerFunc}
                        step={step}
                        correctAnswer={quiz.correct_answer}
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