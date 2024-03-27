import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Quiz from '../pages';
import Wrapper from './utils/renderUI';
import * as api from '../services/quiz';

const mockRouterPush = jest.fn();
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));

const setup = () => {
  return render(<Quiz />, { wrapper: props => Wrapper(props) });
};

// await act(async () => {
//   await userEvent.click(screen.getByText('퀴즈풀기'));
// });
// await waitFor(() => {
//   console.log(mockRouterPush.mock.calls[0][0]);
//   expect(mockRouterPush.mock.calls[0][0]).toStrictEqual(expect.stringContaining('/quiz'));
// });

describe('퀴즈 페이지 컴포넌트 테스트', () => {
  test('퀴즈 리스트 API 호출 결과를 화면에 보여준다', async () => {
    // const mockedRemoteFn = jest
    //   .spyOn(api, 'getQuiz')
    //   .mockReturnValue(new Promise(res => res([{ category: 'test', correct_answer: 'correct', difficulty: 'hard' }])));

    setup();
    expect(screen.getByText('퀴즈풀기')).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(screen.getByText('퀴즈풀기')).toBeInTheDocument();
    // });
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
