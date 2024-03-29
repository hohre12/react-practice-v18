import { render, screen, waitFor, renderHook, getByText } from '@testing-library/react';
import Quiz from '../pages/quiz';
import Wrapper from './utils/renderUI';
import { useQuery } from 'react-query';
import { RecoilRoot } from 'recoil';

const mockRouterPush = jest.fn();
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

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
  test('퀴즈 리스트 API 호출 결과를 화면에 보여준다', async () => {
    const mockData = {
      data: fakeMockData,
      isLoading: false,
    };
    (useQuery as jest.Mock).mockReturnValue(mockData);
    setup();
    expect(await screen.findByText('퀴즈 페이지')).toBeInTheDocument();
    // await waitFor(async () => {
    //   const headerElement = await screen.findByRole('heading', { name: /퀴즈/i });
    //   expect(headerElement).toBeInTheDocument();
    // });

    // const mockQuizList = [
    //   { id: 1, category: 'test1' },
    //   { id: 2, category: 'test2' },
    // ];
    // const mockUseQuery = jest.fn().mockReturnValue({ data: mockQuizList, isLoading: false, isError: false });

    // const useQueryMock = jest.spyOn(ReactQuery, 'useQuery').mockImplementation();
    // expect(useQueryMock).toHaveBeenCalledTimes(1);

    // const tempMockData = {
    //   data: [{ category: 'test' }, { category: 'test2' }],
    //   isLoading: false,
    //   isError: null,
    // };

    // const mockedRemoteFn = jest
    //   .spyOn(api, 'getQuiz')
    //   .mockReturnValue(new Promise(res => res([{ category: 'test', correct_answer: 'correct', difficulty: 'hard' }])));
    // setup();
    // await waitFor(
    //   () => {
    //     expect(screen.getByText('test1')).toBeInTheDocument();
    //   },
    //   { timeout: 3000 }
    // );
    // expect(mockUseQuery).toHaveBeenCalled();
  });
  //   test('정답 선택 후, 정오답 여부 alert', async () => {
  //     setup();
  //   });
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
