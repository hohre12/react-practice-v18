import styled, { css } from 'styled-components'
import { MdDone } from 'react-icons/md';
import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectAnswerListState } from '../../recoil/atoms/quiz';

const QuizItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const CheckCircle = styled.div<{$status?: 'right' | 'wrong' | null}>`
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
    props.$status === 'right' &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div<{$status?: 'right' | 'wrong' | null}>`
  flex: 1;
  font-size: 21px;
  ${props =>
    props.$status === 'right' ?
    css`
      color: #ced4da;
    ` : props.$status === 'wrong' ? css`
    color: #e00b2b;
    ` : css`color: #495057`}
`;

type TQuizItem = {
    text: string,
    step: number,
    correctAnswer: string,
    selectAnswerFunc?: (val: string) => void,
}


const QuizItem = ({text, step, correctAnswer, selectAnswerFunc}: TQuizItem) => {
    const selectAnswerList = useRecoilValue(selectAnswerListState)
    const [status, setStatus] = useState<'right' | 'wrong' | null>(null)
    const handleClick = () => {
        if(selectAnswerFunc) selectAnswerFunc(text)
    }

    useEffect(() => {
        if(selectAnswerList[step - 1]) {
            if(text === correctAnswer) {
                setStatus('right')
            } else {
                if(text === selectAnswerList[step - 1]) {
                    setStatus('wrong')
                }
            }
        } else {
            setStatus(null)
        }
    }, [selectAnswerList, step, correctAnswer, text])
    return <QuizItemStyled>
        <CheckCircle $status={status} onClick={handleClick}>{status && <MdDone />}</CheckCircle>
        <Text $status={status}>{text}</Text>
    </QuizItemStyled>
}

export default memo(QuizItem)