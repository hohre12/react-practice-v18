import { fireEvent, render, screen } from '@testing-library/react';
import Quiz from '../pages/quiz';
import Wrapper from './utils/renderUI';
import { useQuery } from 'react-query';

const mockRouterPush = jest.fn();
const mockUseQuery = useQuery as jest.Mock<any>;
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));
jest.mock('react-query');

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
];

describe('퀴즈 페이지 컴포넌트 테스트', () => {
  beforeEach(() => {
    mockUseQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Page Rendering', () => {
    setup();
  });
  test('Displays loading indicator', () => {
    const { getByText } = setup();
    expect(getByText(/문제 가져오는중.../i)).toBeVisible();
  });
  test('Displays error message', () => {
    mockUseQuery.mockImplementation(() => ({
      isLoading: false,
      isError: true,
    }));
    const { getByText } = setup();
    getByText(/에러.../i);
  });
  test('Displays Quiz Data', async () => {
    mockUseQuery.mockImplementation(() => ({ isLoading: false, data: fakeMockData }));
    setup();
    expect(await screen.findByText('question1')).toBeInTheDocument();
  });
  test('정답 선택 후, 정답 여부 alert', async () => {
    // mockUseQuery.mockImplementation(() => ({ isLoading: false, data: fakeMockData }));
    // const { getByTestId } = setup();
    // const checkCircle = getByTestId('check-circle');
    // fireEvent.click(checkCircle);
  });
  test('오답 선택 후, 오답 여부 alert', async () => {
    setup();
  });
  //   test('정답여부 alert 확인 후, QuizItem 상태 변경 및 다음으로 버튼 노출', async () => {
  //     setup();
  //   });
  //   test('10문제 다 풀면 다음으로 버튼 텍스트가 오답노트로 버튼 텍스트 변경', async () => {
  //     setup();
  //   });
  //   test('시간 증가', async () => {
  //     setup();
  //   });
  //   test('오답노트로 버튼 클릭시, QuizResult 페이지로 이동', async () => {
  //     setup();
  //   });
});
