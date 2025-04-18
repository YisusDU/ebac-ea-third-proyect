import React from 'react';
import useProduct from '../../../hooks/useProduct';
import { StoreContainer, ProductsArray, Product, LoadingOrError, CategorySection } from './styles.js';
import { FAILED, LOADING, SUCCEEDED } from '../../../state/status.js';

const ProductsList = () => {
    const {
        categorizedProducts,
        status,
        handleAddToCart
    } = useProduct();

    const formatCategoryName = (category) => {
        return category.split("'").join("").split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };


    return (
        <StoreContainer >
            <ProductsArray>
                {status === SUCCEEDED && Object.entries(categorizedProducts).map(([category, products]) => (
                    <CategorySection key={category}>
                        <h2>{formatCategoryName(category)}</h2>
                        <div className="products-grid">
                            {products.map(product => (
                                <Product data-testid="product-item" key={product.id}>
                                    <img src={product.image} alt={product.title} />
                                    <figcaption>{product.title}</figcaption>
                                    <p>${product.price}</p>
                                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                </Product>
                            ))}
                        </div>
                    </CategorySection>
                ))}
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
