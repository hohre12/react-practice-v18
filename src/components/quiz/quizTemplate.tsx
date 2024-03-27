import { ReactNode } from 'react';
import { QuizTemplateStyled } from '../../styles/quiz.style';

const QuizTemplate = ({ children }: { children: ReactNode }) => {
  return <QuizTemplateStyled>{children}</QuizTemplateStyled>;
};

export default QuizTemplate;
