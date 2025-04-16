import React from 'react';
import useProduct from '../../../hooks/useProduct';
import { StoreContainer, ProductsArray, Product, LoadingOrError } from './styles.js';
import { FAILED, LOADING, SUCCEEDED } from '../../../state/status.js';

const ProductsList = () => {
    const {
        products: filteredProducts,
        status,
        searchTerm,
        handleAddToCart
    } = useProduct();


    return (
        <StoreContainer >
            <ProductsArray>
                {
                    (filteredProducts && status === SUCCEEDED) && filteredProducts.map(product => (
                        <Product data-testid="product-item" key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <figcaption>{product.title}</figcaption>
                            <p>${product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </Product>
                    ))
                }
                {
                    status === LOADING &&
                    <LoadingOrError>
                        <h2>Loading...................... 🥱</h2>
                    </LoadingOrError>
                }
                {
                    status === FAILED &&
                    <LoadingOrError>
                        <h2>There was an error loading the products. 😖</h2>
                    </LoadingOrError>
                }

            </ProductsArray>
        </StoreContainer>


    );
};

export default ProductsList;
