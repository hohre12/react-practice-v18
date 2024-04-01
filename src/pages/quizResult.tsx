import { useRecoilValue } from 'recoil';
import { quizListState, selectAnswerListState, timeState } from '../recoil/atoms/quiz';
import { Link } from 'react-router-dom';
import { TQuiz } from '../type/quiz';
import { useInternalRouter } from '../hooks/useInternalRouter';

const QuizResult = () => {
  const router = useInternalRouter();
  const quizList = useRecoilValue(quizListState);
  const selectAnswerList = useRecoilValue(selectAnswerListState);
  const time = useRecoilValue(timeState);

  // 굳이 useMemo를 안써도 될거같음.
  const rightAnswer: TQuiz[] = quizList.filter((it, idx) => it.correct_answer === selectAnswerList[idx]);

  return (
    <div>
      <h1>결과</h1>
      <h2>경과시간 : {time} 초</h2>
      <h2>정답갯수 : {rightAnswer?.length} 개</h2>
      <h2>오답갯수 : {quizList.length - rightAnswer.length} 개</h2>
      <button onClick={() => router.push('/note')}>오답노트 가기</button>
    </div>
  );
};

export default QuizResult;
