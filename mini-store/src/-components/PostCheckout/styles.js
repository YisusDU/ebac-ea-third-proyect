import styled from "styled-components";
import Theme from "../../theme/index.js";


const PostCheckoutContainer = styled.article`
    width: 100%;
    min-width: 460px;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    background: linear-gradient( #00ff2d6e 0%, ${Theme.colors.background} 50%);
    box-sizing: border-box;
    flex-direction: column;

    & > p{
      color: ${Theme.fonts.color.primary};
      font-size: .9em;
      text-align: center;
      font-style: italic;
    }

    & > button {
      width: 50%;
      margin-top: 20px;
      padding: 12px 24px;
      color: white;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: ${Theme.colors.secondary};
      border: 2px solid ${Theme.colors.secondary};
    }

    @media (hover: hover){
      & > button:hover {
      background-color: transparent;
      color: ${Theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
    }
    }

    @media (prefers-color-scheme: dark) {
        background: linear-gradient( #00ff2d6e 0%, ${Theme.colors.darkModeBackground} 50%);
        p{
          color: ${Theme.fonts.color.secondary};
        }
    }

`;

export { PostCheckoutContainer };