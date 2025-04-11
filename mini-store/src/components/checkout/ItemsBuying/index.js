import React from "react";
import { useSelector } from 'react-redux';
import { ItemsContainer, ProductList, ProductItem } from "./styles";

const ItemsBuying = ({ message }) => {
    const items = useSelector(state => state.cart.products);

    return (
        <ItemsContainer>
            <div>
                <h2>{message}</h2>
            </div>
            <div>
                <h3>Your items:</h3>
                <ProductList>
                    <ul>
                        {items.map(item => (
                            <ProductItem key={item.id} role='listitem'>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                <figcaption>
                                    {item.title}  ${item.price} &times; {item.quantity}
                                </figcaption>
                            </ProductItem>
                        ))}
                    </ul>
                </ProductList>
            </div>
        </ItemsContainer>
    )
};
export default ItemsBuying;