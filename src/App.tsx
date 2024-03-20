import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Quiz from './pages/quiz';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0
        }
    }
})
// 1. useQuiz hooks 사용하기 ( 데이터와 UI 분리 ) - Headless 기반의 추상화
// 2. SSR로 구현해보기 ( 나중에 nextJS로도 구현 )

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <div>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/quiz' Component={Quiz} />
            </Routes>
        </div>
    </QueryClientProvider>
  );
}

export default App;
