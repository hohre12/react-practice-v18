import React, { ReactNode } from 'react';
import './App.css';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import StartPage from './pages';
import Quiz from './pages/quiz';
import QuizResult from './pages/quizResult';
import Note from './pages/note';
import { createGlobalStyle, styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const GlobalStyled = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const LayoutStyled = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
// 1. useQuiz hooks 사용하기 ( 데이터와 UI 분리 ) - Headless 기반의 추상화
// 2. SSR로 구현해보기 ( 나중에 nextJS로도 구현 )

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyled />
      <Layout>
        <ReactRouterRoutes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" Component={Quiz} element={<Quiz />} />
          <Route path="/quizResult" element={<QuizResult />} />
          <Route path="/note" element={<Note />} />
        </ReactRouterRoutes>
      </Layout>
    </QueryClientProvider>
  );
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

export default App;
