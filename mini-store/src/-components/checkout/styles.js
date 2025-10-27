import styled from "styled-components";
import Theme from "../../theme/index.js";

const CheckoutContainer = styled.article`
  width: 100%;
  min-width: 460px;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center ;
  flex-wrap: wrap;
  gap: 20px;
  background: linear-gradient(
    ${Theme.colors.primary} 0%,
    ${Theme.colors.background} 30% 
  );
  box-sizing: border-box;

  h1 {
    width: 100%;
    font-size: 2em;
    color: ${Theme.fonts.color.secondary};
    margin-bottom: 20px;
  }
  button {
    background-color: rgb(121, 186, 255);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
    transition: scale 0.3s ease-in-out; 
    @media (hover: hover) and (pointer: fine) {
      &:hover{
          background-color:rgb(121, 186, 255);
          scale: 1.05;
          transition: scale 0.s ease-in-out; 
      } 
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: start;
  }
  
  @media (prefers-color-scheme: dark){
    background: linear-gradient( #007bff 0%, #cfcfcf 30%);
  }
`;

export { CheckoutContainer }; 