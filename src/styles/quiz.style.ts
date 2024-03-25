import styled from "styled-components";

export const LoadingStyled = styled.div`
    padding: 300px;
`

export const QuizPageStyled = styled.div`
    h1 {
        text-align: center;
    }
`

export const QuizTemplateStyled = styled.div`
    width: 512px;
    position: relative;

    margin: 0 auto;

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    button {
        margin-top: 20px;
        padding: 11px 16px;
        font-weight: 600;
        font-size: 15px;
        border-radius: 7px;
        background-color: #b5f5e2;
        color: #20c997;;
        border: none;
        cursor: pointer;
    }
`

export const QuizHeaderStyled = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    background: white;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid #e9ecef;
    h1 {
        margin: 0;
        font-size: 24px;
        color: #343a40;
    }
    .category {
        margin-top: 4px;
        color: #868e96;
        font-size: 16px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`

export const QuizListStyled = styled.div`
  flex: 1;
  padding: 20px 32px;
  overflow-y: auto;
  background: gray;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;