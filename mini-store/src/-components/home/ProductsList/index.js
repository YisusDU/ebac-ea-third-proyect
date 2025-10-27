import React from 'react';
import useProduct from '../../../hooks/useProduct.js';
import { FAILED, LOADING, SUCCEEDED } from '../../../state/status.js';
import { 
    StoreContainer, 
    ProductsArray, 
    Product, 
    LoadingOrError, 
    CategorySection,
    ProductNotFound 
} from './styles.js';

const ProductsList = () => {

    const {
        categorizedProducts,
        handleAddToCart,
        status
    } = useProduct();

    const formatCategoryName = (category) => {
        return category.split("'").join("").split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };


    return (
        <StoreContainer >
            <ProductsArray>
                {status === SUCCEEDED && Object.entries(categorizedProducts).length > 0 ?
                    Object.entries(categorizedProducts).map(([category, products]) => (
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
                    )) : status === SUCCEEDED && (
                        <ProductNotFound>
                            <h2>No products found with that search term 😕</h2>
                        </ProductNotFound>
                    )
                }
                {
                    status === LOADING &&
                    <LoadingOrError>
                        <h2>Loading... 🥱</h2>
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
