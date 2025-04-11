import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContainer, ProductsArray, Product, LoadingOrError } from './styles.js';
import { fetchProducts, addProduct } from '../../../state/products.slice.js';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../../state/status.js';

const ProductsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.stock);
    const status = useSelector((state) => state.cart.status);
    const searchTerm = useSelector((state) => state.cart.searchTerm);

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
    // Filter the products based on the search term
    const filteredProducts = useMemo(() => {
        return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm])


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
