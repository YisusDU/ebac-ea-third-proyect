import styled, { css } from "styled-components";
import Theme from "../../../theme";

const titleStyle = css`
  color: ${Theme.colors.primary};
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const ItemsContainer = styled.article`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  h2 {
    text-align: center;
    ${titleStyle}
  }
  h3 {
    text-align: justify;
    ${titleStyle}
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 0 20px 0;
    box-sizing: border-box;
  }
  @media (prefers-color-scheme: dark){
    background-color: ${Theme.colors.darkModeBackgroundITem};
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    h2,h3 {
      color: ${Theme.fonts.color.secondary}
    }
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 5px;
  }
`;

export { ItemsContainer, ProductList, ProductItem };