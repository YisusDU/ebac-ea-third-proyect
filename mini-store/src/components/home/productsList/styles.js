import styled from 'styled-components';

const StoreContainer = styled.main`
    margin: 0 auto;
`;

const ProductsArray = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Align items to the top and bottom */
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;

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
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

//Loading and error styles
const LoadingOrError = styled.div`
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

export { StoreContainer, ProductsArray, Product, LoadingOrError };
