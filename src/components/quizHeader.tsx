import { styled } from "styled-components"
import { TQuizHeader } from "../type/quiz"

const QuizHeaderStyled = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    h1 {
        margin: 0;
        font-size: 24px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 16px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`

const QuizHeader = ({category, difficulty, question, type}: TQuizHeader) => {
    return <QuizHeaderStyled>
        <h1 dangerouslySetInnerHTML={{__html: question}}></h1>
        <div className="day">{category}</div>
        <div className="tasks-left">{difficulty}</div>
        <div className="tasks-left">{type}</div>
    </QuizHeaderStyled>
}

export default QuizHeader