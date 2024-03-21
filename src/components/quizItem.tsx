import styled, { css } from 'styled-components'
import { MdDone } from 'react-icons/md';
import { useEffect, useState } from 'react';

const QuizItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const CheckCircle = styled.div<{$done?: boolean}>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.$done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div<{$done?: boolean}>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.$done &&
    css`
      color: #ced4da;
    `}
`;

type TQuizItem = {
    text: string,
    isSelect: boolean,
    correctAnswer: string,
    selectAnswer: (val: string) => void,
}


const QuizItem = ({text, isSelect, correctAnswer, selectAnswer}: TQuizItem) => {
    // correctAnswer === text -> 정답
    // 선택했을때, 정답이면 -> 초록색
    // 선택했을때, 오답이면 -> 선택한거 빨간색, 정답 초록색
    const [done, setDone] = useState<boolean>(false)
    const handleClick = () => {
        setDone(!done)
        selectAnswer(text)
    }
    useEffect(() => {
        setDone(false)
    }, [text])

    useEffect(() => {
        if(isSelect) console.log('')
    }, [isSelect])
    return <QuizItemStyled>
        <CheckCircle $done={done} onClick={handleClick}>{done && <MdDone />}</CheckCircle>
        <Text $done={done}>{text}</Text>
    </QuizItemStyled>
}

export default QuizItem