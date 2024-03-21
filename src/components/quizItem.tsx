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


const QuizItem = ({text, selectAnswer}: {text: string, selectAnswer: (val: string) => void}) => {
    const [done, setDone] = useState<boolean>(false)
    const handleClick = () => {
        setDone(!done)
        selectAnswer(text)
    }
    useEffect(() => {
        setDone(false)
    }, [text])
    return <QuizItemStyled>
        <CheckCircle $done={done} onClick={handleClick}>{done && <MdDone />}</CheckCircle>
        <Text $done={done}>{text}</Text>
    </QuizItemStyled>
}

export default QuizItem