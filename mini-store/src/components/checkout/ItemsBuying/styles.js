import styled from "styled-components";
import Theme from "../../../theme";

const ItemsContainer = styled.article`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: ${Theme.colors.primary};
    margin-bottom: 20px;
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 0 20px 0;
    box-sizing: border-box;
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