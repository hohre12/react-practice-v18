import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { TQuiz, TQuizListItem } from '../type/quiz';
import { shuffle } from '../utils/common';
import QuizItem from './quizItem';

const QuizListStyled = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: gray;
`;

const QuizList = ({correct_answer, incorrect_answers}: TQuizListItem) => {
    const [answerList, setAnswerList] = useState<string[]>([])
    useEffect(() => {
        setAnswerList(shuffle([correct_answer, ...incorrect_answers]))
    }, [correct_answer, incorrect_answers])
    return <QuizListStyled>
        {
            answerList?.map(it => <QuizItem text={it}></QuizItem>)
        }
    </QuizListStyled>
}

export default QuizList