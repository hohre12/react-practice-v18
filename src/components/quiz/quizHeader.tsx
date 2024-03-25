import { styled } from "styled-components"
import { TQuizHeader } from "../../type/quiz"
import { QuizHeaderStyled } from "../../styles/quiz.style"
import { memo } from "react"

const QuizHeader = ({category, difficulty, question}: TQuizHeader) => {
    return <QuizHeaderStyled>
        <h1 dangerouslySetInnerHTML={{__html: question}}></h1>
        <div className="day">{category}</div>
        <div className="tasks-left">{difficulty}</div>
    </QuizHeaderStyled>
}

export default memo(QuizHeader)