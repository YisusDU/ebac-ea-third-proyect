import styled, { css } from 'styled-components';

const screenMessage = css`
    display: block;
    min-width: 480px;
    font-size: 40px;
    text-align: center;
    background-color: rgba(204, 204, 204, 0.8);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    width: 100%;
    height: 150vh;
    
    h2 {
        width: 100%;
        max-width: 600px;
        padding: 2rem;
        border-radius: 10px;
        color: #000;
        text-wrap: wrap;
        display: flex;
        justify-content: center;
        align-items: center; 
        box-sizing: border-box;
    }
`;

const StoreContainer = styled.main`
    margin: 0 auto;
    min-width: 480px;

    @media (prefers-color-scheme: dark) {
        background-color: #cdcbcb;
    }

`;

const ProductsArray = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #282c34;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    max-width: 250px;

    img {
        width: 100%;
        height: 200px;
    }
    figcaption {
        font-weight: bold;
    }
    
    p {
        font-size: 1.2rem;
    }
    
    button {
        height: 40px; /* Fixed height for alignment */
        padding: 0.5rem 1rem;
        background-color: #282c34;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color:rgba(145, 145, 145, 0.86);
            transition: all 0.1s ease; 
        }

        button:hover {
            background-color: #282c34d1;
            transition: all 0.3s ease;
        }
        button:active {
            background-color: #282c3499;
            scale: 0.99;
            transition: all 0.1s ease;
        }
    }

    @media (prefers-color-scheme: dark) {
        background-color: #919191;
    }


`;

const CategorySection = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    
    h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
        padding-bottom: 0.5rem;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
        gap: 0.5rem;
        width: 100%;
        justify-items: center;
    }

    ${Product} {
        width: 100%;
        max-width: 215px;
    }
`;

const ProductNotFound = styled.article`
   ${screenMessage}
`;



//Loading and error styles
const LoadingOrError = styled.article`
  ${screenMessage}
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 140vh;
  position: absolute;
`;

export { 
    StoreContainer, 
    ProductsArray, 
    Product, 
    LoadingOrError, 
    CategorySection,
    ProductNotFound 
};
