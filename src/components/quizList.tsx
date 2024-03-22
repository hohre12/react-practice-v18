import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { TQuiz } from '../type/quiz';
import { shuffle } from '../utils/common';
import QuizItem from './quizItem';

const QuizListStyled = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: gray;
`;

type TQuizList = {
    answers: string[],
    step: number,
    correctAnswer: string,
    selectAnswerFunc?: (val: string) => void
}

const QuizList = ({answers, step, correctAnswer, selectAnswerFunc}: TQuizList) => {
    return <QuizListStyled>
        {
            answers?.map((it, idx) => <QuizItem key={idx} text={it} step={step} correctAnswer={correctAnswer} selectAnswerFunc={selectAnswerFunc}></QuizItem>)
        }
    </QuizListStyled>
}

export default QuizList