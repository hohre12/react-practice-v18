export type TQuizHeader = {
  category: string;
  difficulty: string;
  question: string;
};

export type TQuiz = TQuizHeader & {
  correct_answer: string;
  incorrect_answers: string[];
};
