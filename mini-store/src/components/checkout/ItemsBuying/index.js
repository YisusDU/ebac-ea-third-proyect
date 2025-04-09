import React from "react";
import { ItemsContainer, ProductList, ProductItem } from "./styles";

const ItemsBuying = ({message}) => {
    return (
        <ItemsContainer>
            <div>
                <h2>{message}</h2>
            </div>
            <div>
                <h3>Your items:</h3>
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