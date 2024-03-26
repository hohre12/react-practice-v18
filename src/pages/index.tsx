import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StartPageStyled = styled.div`
  text-align: center;
  padding-top: 200px;
  a {
    padding: 30px;
    background-color: #e8f3ff;
    color: #1b64da;
    padding: 11px 16px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    border-radius: 7px;
  }
`;

const StartPage = () => {
  return (
    <StartPageStyled>
      <h1>테스트 퀴즈문제입니다</h1>
      <Link to="/quiz">퀴즈풀기</Link>
    </StartPageStyled>
  );
};

export default StartPage;
