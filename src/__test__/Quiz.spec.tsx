import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Quiz from '../pages/quiz';
import Wrapper from './utils/renderUI';
import { useQuery } from 'react-query';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { async } from 'q';

// TODO - 리팩토링
// 1. useQuery를 customHook으로 변경 후 리팩토링하기
// 2. fake Data 파일로 빼기

const mockRouterPush = jest.fn();
const mockUseQuery = useQuery as jest.Mock<any>;
const mockAlert = jest.fn();
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));
jest.mock('react-query');
window.alert = mockAlert;

const setup = () => {
  return render(<Quiz />, { wrapper: props => Wrapper(props) });
};

const fakeMockData = [
  {
    category: 'Entertainment: Television',
    correct_answer: '9',
    difficulty: 'hard',
    incorrect_answers: ['1', '2', '3'],
    question: 'question1',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question2',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question3',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question4',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question5',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question6',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question7',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question8',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question9',
    type: 'multiple',
  },
  {
    category: 'Entertainment: Television',
    correct_answer: '6',
    difficulty: 'hard',
    incorrect_answers: ['4', '5', '7'],
    question: 'question10',
    type: 'multiple',
  },
];

describe('퀴즈 페이지 isLoading', () => {
  beforeEach(() => {
    mockUseQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Displays loading indicator', () => {
    const { getByText } = setup();
    expect(getByText(/문제 가져오는중.../i)).toBeVisible();
  });
});

describe('퀴즈 페이지 isError', () => {
  beforeEach(() => {
    mockUseQuery.mockImplementation(() => ({ isError: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Displays error message', () => {
    const { getByText } = setup();
    getByText(/에러.../i);
  });
});

describe('퀴즈 페이지 컴포넌트 테스트', () => {
  beforeEach(() => {
    mockUseQuery.mockImplementation(() => ({ isLoading: false, data: fakeMockData }));
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Page Rendering', () => {
    setup();
  });
  test('Displays Quiz Data', async () => {
    setup();
    expect(await screen.findByText('question1')).toBeInTheDocument();
  });
  test('시간 증가', async () => {
    const { getByText } = setup();
    expect(getByText('시간: 0초')).toBeInTheDocument();
    await act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText('시간: 1초')).toBeInTheDocument();
  });
  test('정답 선택 후, 정답/오답 여부 alert', async () => {
    const { getByTestId } = setup();
    const checkCircle = getByTestId('0-check-circle');
    fireEvent.click(checkCircle);
    expect(mockAlert).toHaveBeenCalled();
    const alertText = mockAlert.mock.calls[0][0];
    expect(alertText).toMatch(/^(정답입니다!|오답입니다!)$/);
  });
  test('정답여부 alert 확인 후, QuizItem 상태 변경 및 다음으로 버튼 노출', async () => {
    const { getByTestId, queryByText } = setup();
    const checkCircle = getByTestId('0-check-circle');
    expect(queryByText('다음으로')).toBeNull();
    fireEvent.click(checkCircle);
    expect(mockAlert).toHaveBeenCalled();
    expect(queryByText('다음으로')).toBeInTheDocument();
  });
  test('10문제 다 풀면 다음으로 버튼 텍스트가 오답노트로 버튼 텍스트 변경', async () => {
    const { getByTestId, getByText, queryByText } = setup();
    for (let i = 0; i < 10; i++) {
      const checkCircle = getByTestId(`0-check-circle`); // 0-check-circle 테스트 아이디를 가진 div를 클릭하여 문제를 푼다고 가정합니다.
      fireEvent.click(checkCircle);
      expect(mockAlert).toHaveBeenCalled();
      if (i !== 9) {
        const nextButton = getByText('다음으로');
        fireEvent.click(nextButton);
      } else {
        // 마지막 문제 선택시 "오답노트로" 버튼이 나타나는지 확인
        const wrongNoteButton = queryByText('오답노트로');
        expect(wrongNoteButton).toBeInTheDocument();
        await act(async () => {
          await userEvent.click(screen.getByText('오답노트로'));
        });
        await waitFor(() => {
          expect(mockRouterPush.mock.calls[0][0]).toStrictEqual(expect.stringContaining('/quizResult'));
        });
      }
    }
  });
  //   test('mocking test!!!', async () => {
  //     setup();
  //   });
});
