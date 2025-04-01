import React from "react";
import { ItemsContainer, ProductList, ProductItem } from "./styles";

const ItemsBuying = () => {
    return (
        <ItemsContainer>
            <div>
                <h2>Please, check your items before buying</h2>
            </div>
            <div>
                <h2>Your items:</h2>
                <ProductList>
                    <ProductItem>product</ProductItem>
                    <ProductItem>product</ProductItem>
                    <ProductItem>product</ProductItem>
                </ProductList>
            </div>
        </ItemsContainer>
    )
};
export default ItemsBuying;