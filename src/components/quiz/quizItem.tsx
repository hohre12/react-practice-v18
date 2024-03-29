import { MdDone } from 'react-icons/md';
import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectAnswerListState } from '../../recoil/atoms/quiz';
import { QuizItemStyled, CheckCircle, Text } from '../../styles/quiz.style';

type TQuizItem = {
  idx: number;
  text: string;
  step: number;
  correctAnswer: string;
  selectAnswerFunc?: (val: string) => void;
};

type TTextStatus = 'right' | 'wrong' | null;

const QuizItem = ({ idx, text, step, correctAnswer, selectAnswerFunc }: TQuizItem) => {
  const selectAnswerList = useRecoilValue(selectAnswerListState);
  const [status, setStatus] = useState<TTextStatus>(null);

  const handleClick = () => {
    if (selectAnswerFunc) selectAnswerFunc(text);
  };

  useEffect(() => {
    // 사용자 선택 리스트 , 단계 , 정답 , item text가 변할때
    // 만약, 정답을 체크했으면
    // 해당 item text가 정답일때 -> right
    // 해당 item text가 정답이 아니면서, 사용자 선택값이면 -> wrong
    // 정답을 체크안했으면 style 없음
    if (selectAnswerList[step - 1]) {
      if (text === correctAnswer) {
        setStatus('right');
      } else {
        if (text === selectAnswerList[step - 1]) {
          setStatus('wrong');
        }
      }
    } else {
      setStatus(null);
    }
  }, [selectAnswerList, step, correctAnswer, text]);

  return (
    <QuizItemStyled>
      <CheckCircle data-testid={`${idx}-check-circle`} $status={status} onClick={handleClick}>
        {status && <MdDone />}
      </CheckCircle>
      <Text $status={status}>{text}</Text>
    </QuizItemStyled>
  );
};

export default memo(QuizItem);
