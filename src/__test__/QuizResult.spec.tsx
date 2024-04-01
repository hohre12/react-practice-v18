import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import QuizResult from '../pages/quizResult';
import Wrapper from './utils/renderUI';

const mockRouterPush = jest.fn();
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));

const setup = () => {
  return render(<QuizResult />, { wrapper: props => Wrapper(props) });
};

describe('퀴즈결과 페이지 컴포넌트 테스트', () => {
  test('오답노트 가기 버튼 클릭을 했을때, 오답노트 페이지로 넘어간다.', async () => {
    setup();
    await act(async () => {
      await userEvent.click(screen.getByText('오답노트 가기'));
    });
    await waitFor(() => {
      console.log(mockRouterPush.mock);
      expect(mockRouterPush.mock.calls[0][0]).toStrictEqual(expect.stringContaining('/note'));
    });
  });
});
