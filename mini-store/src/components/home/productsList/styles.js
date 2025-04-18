import styled from 'styled-components';

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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
    
    h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
        padding-bottom: 0.5rem;
    }

    .products-grid {
        display: flex;
        overflow-x: auto;
        width: 100%;
        gap: 1rem;
        padding: 1rem 0;
        justify-content: space-between;
        flex-wrap: wrap;

    }

    ${Product} {
        flex: 0 0 auto;
        width: 215px;
    }
`;



//Loading and error styles
const LoadingOrError = styled.article`
  font-size: 50px;
  text-align: center;
  background-color: rgba(204, 204, 204, 0.8);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);

  h2 {
    color: #000; 
  }
`;

export { StoreContainer, ProductsArray, Product, LoadingOrError, CategorySection };
