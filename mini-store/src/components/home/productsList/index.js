import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContainer, ProductsArray, Product, LoadingOrError } from './styles.js';
import { fetchProducts, addProduct } from '../../../state/products.slice.js';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../../state/status.js';

const ProductsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.stock);
    const status = useSelector((state) => state.cart.status);

    // We use useEffect to handle asynchronous operations

    useEffect(() => {
        status === IDLE && dispatch(fetchProducts())
    }, [dispatch, status]);

    // Handle the action of adding to the cart

    const handleAddToCart = (product) => {
        dispatch(addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        }));
    };


    return (
        <StoreContainer >
            <ProductsArray>
                {
                    (products && status === SUCCEEDED) && products.map(product => (
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
