import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartPage from '../pages';

const TestComponent = () => {
  return (
    <div>
      <button onClick={() => console.log('테스트')}>퀴즈풀기</button>
    </div>
  );
};

const setup = () => {
  return render(<TestComponent />);
};

describe('퀴즈시작 메인 페이지 컴포넌트 테스트', () => {
  test('퀴즈시작 버튼 클릭을 했을때, 퀴즈 페이지로 넘어간다.', async () => {
    setup();
    await userEvent.click(screen.getByText('퀴즈풀기'));
    // await waitFor(() => {
    //     expect()
    // })
  });
});
