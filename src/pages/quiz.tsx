import { useCallback, useEffect, useMemo, useState } from "react"
import QuizTemplate from "../components/quiz/quizTemplate"
import QuizHeader from "../components/quiz/quizHeader"
import { useQuery } from "react-query"
import { getQuiz } from "../services/quiz"
import { TQuiz } from "../type/quiz"
import { shuffle } from '../utils/common';
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { answerListState, quizListState, selectAnswerListState, timeState } from "../recoil/atoms/quiz"
import QuizItem from "../components/quiz/quizItem"
import { QuizPageStyled, QuizListStyled, LoadingStyled } from "../styles/quiz.style"
import { SyncLoader } from "react-spinners"

const Quiz = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery(['quizList'], getQuiz)
    const [step, setStep] = useState<number>(1)
    
    const [quizList, setQuizList] = useRecoilState(quizListState)
    const [answerList, setAnswerList] = useRecoilState(answerListState)
    const [selectAnswerList, setSelectAnswerList] = useRecoilState(selectAnswerListState)
    const [time, setTime] = useRecoilState(timeState)

    const isAnswer = selectAnswerList.length === step
    const quiz: TQuiz = useMemo(() => {
        // quizList와 step가 변경되지않는이상, 메모이제이션 된 값 사용
        return quizList[step - 1]
    }, [quizList, step])

    const initData = useCallback(() => {
        // 캐싱된 데이터가 바뀌면 ( 문제가 바뀌면 ), 
        // 1. quiz 로컬스토리지 초기화
        // 2. 클라 저장소에 data 저장
        // 3. 보기 섞은 후 클라 저장소에 list로 저장
        // 4. 답안 선택 초기화
        // 5. 시간 초기화
        localStorage.removeItem('quizStorage')
        setQuizList(data)
        const newAnswerList = quizList.map((it: any) => shuffle([it.correct_answer, ...it.incorrect_answers]));
        setAnswerList(newAnswerList);
        setSelectAnswerList([])
        setTime(0)
    }, [data, setQuizList, quizList, setAnswerList, setSelectAnswerList, setTime])
    
    const selectAnswerFunc = (val: string) => {
        setSelectAnswerList([...selectAnswerList, val]) // recoil
        if(quiz?.correct_answer === val) alert('정답입니다!')
        else alert('오답입니다!')
    }

    const goNextStep = useCallback(() => {
        if(answerList.length === step) {
            navigate('/quizResult')
        }
        else setStep(step + 1)
    }, [answerList, navigate, step])

    useEffect(() => {
        if (data) {
            initData()
        }
    }, [data, initData])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevSeconds => prevSeconds + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [setTime])

    if (isLoading) return <LoadingStyled><h3>문제 가져오는중...</h3><SyncLoader></SyncLoader></LoadingStyled>
    if (isError) return <div>에러...</div>

    return <QuizPageStyled>
        <h1>퀴즈 페이지</h1>
        <div>시간: {time}초</div>
        <QuizTemplate>
            {
                quiz && <>
                    <QuizHeader
                        category={quiz.category}
                        difficulty={quiz.difficulty}
                        question={quiz.question}></QuizHeader>
                    <QuizListStyled>
                        {
                            answerList[step - 1]?.map((it: string, idx: number) => <QuizItem key={idx} text={it} step={step} correctAnswer={quiz.correct_answer} selectAnswerFunc={selectAnswerFunc}></QuizItem>)
                        }
                    </QuizListStyled>
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
    </QuizPageStyled>
}

export default Quiz