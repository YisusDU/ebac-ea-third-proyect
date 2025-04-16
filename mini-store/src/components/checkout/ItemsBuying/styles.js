import styled, { css } from "styled-components";
import Theme from "../../../theme";

const titleStyle = css`
  color: ${Theme.colors.primary};
  margin: 0;
  font-size: 1.5em;
`;

const ItemsContainer = styled.section`
  width: 100%;
  min-width: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
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
    width: 100%;
    margin: 0 0 20px 0;
    box-sizing: border-box;
  }
  @media (prefers-color-scheme: dark){
    background-color: ${Theme.colors.darkModeBackgroundITem};
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
    h2,h3 {
      color: ${Theme.fonts.color.secondary}
    }
  }
`;

const ItemsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
  

  h2 {
    width: 100%;
    display: inline-block;
    text-align: center;
    ${titleStyle}
  }
  @media(prefers-color-scheme: dark){
    h2{
      color: #fff;
    }
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 10px;
  list-style: none;
  margin: auto;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

figure {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    gap: 10px;
    
    img {
      width: 50px;
      height: 60px;
      object-fit: cover;
      border-radius: 5px;
    }

    figcaption {
      display: flex;
      flex-direction: column;
      min-width: 0;
      
      p {
        text-align: justify;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        font-size: 1.5rem;
        color:rgb(105, 105, 105);
      }
      span{
        font-weight: bold; 
        font-size: 1.2em;
        
      }
  }
    
    
  }
  p{
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    figure {
      figcaption {
        p {
          font-size: 1rem; 
        }
        span {
          font-size: 1rem;
        }
      }
    }
  }
`;

const ItemsTotal = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 20px;
  hr {
    width: 100%;
    border: none;
    border-top: 1px solid #000; 
  }

  h3 {
    font-weight: bold;
    font-size: 1.2em;
    color: #333;
  }
`;

export { 
  ItemsContainer, 
  ProductList, 
  ProductItem, 
  ItemsList, 
  ItemsTotal,
  ItemsHeader
};