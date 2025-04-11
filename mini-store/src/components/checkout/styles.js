import styled from "styled-components";
import Theme from "../../theme/index.js";

const CheckoutContainer = styled.section`
  width: 100%;
  min-width: 400px;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: center;
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

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: center;
  }
  
  @media (prefers-color-scheme: dark){
    background: linear-gradient( #007bff 0%, #cfcfcf 30%);
  }
`;

export { CheckoutContainer }; 