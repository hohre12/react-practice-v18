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

const QuizList = ({answers, selectAnswer}: {answers: string[], selectAnswer: (val: string) => void}) => {
    return <QuizListStyled>
        {
            answers?.map((it, idx) => <QuizItem key={idx} text={it} selectAnswer={selectAnswer}></QuizItem>)
        }
    </QuizListStyled>
}

export default QuizList