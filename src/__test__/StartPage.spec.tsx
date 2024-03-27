import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import StartPage from '../pages';
import Wrapper from './utils/renderUI';

const mockRouterPush = jest.fn();
jest.mock('hooks/useInternalRouter', () => ({ useInternalRouter: () => ({ push: mockRouterPush }) }));

const setup = () => {
  return render(<StartPage />, { wrapper: props => Wrapper(props) });
};

describe('퀴즈시작 메인 페이지 컴포넌트 테스트', () => {
  //   beforeEach(async () => {
  //     setup({ route: '/' });
  //   });

  test('퀴즈시작 버튼 클릭을 했을때, 퀴즈 페이지로 넘어간다.', async () => {
    setup();
    // mockRouterPush('test');
    await act(async () => {
      await userEvent.click(screen.getByText('퀴즈풀기'));
    });
    await waitFor(() => {
      console.log(mockRouterPush.mock);
      //   expect(mockRouterPush.mock.calls[0][0]).toStrictEqual(expect.stringContaining('/quiz'));
      //   expect(expect.stringContaining('/quiz'));
    });
  });
});
