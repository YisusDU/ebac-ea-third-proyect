import React from "react";
import { useSelector } from 'react-redux';
import { ItemsContainer, ProductList, ProductItem, ItemsList, ItemsTotal, ItemsHeader } from "./styles";

const ItemsBuying = ({ message }) => {
    const items = useSelector(state => state.cart.products);

    return (
        <ItemsContainer>
            <ItemsHeader>
                <h2>{message}</h2>
            </ItemsHeader>
            <div>
                <h3>Your items:</h3>
                <ProductList>
                    <ItemsList>
                        {items.map(item => (
                            <ProductItem key={item.id} role='listitem'>
                                <figure>
                                    <img src={item.image} alt={item.name} />
                                    <figcaption>
                                        <p>
                                            {item.title}
                                        </p>
                                        <span>
                                            ${item.price} &times; {item.quantity}
                                        </span>
                                    </figcaption>
                                </figure>
                                <p> ${item.price * item.quantity}</p>
                            </ProductItem>
                        ))}
                    </ItemsList>
                </ProductList>
            </div>
            <ItemsTotal>
                <hr />
                <h3>
                    Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0)}
                </h3>
            </ItemsTotal>
        </ItemsContainer>
    )
};
export default ItemsBuying;