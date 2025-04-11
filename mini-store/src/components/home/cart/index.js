import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeProduct } from '../../../state/products.slice';
import { CartContainer, CartItem, RemoveButton, CloseButton } from './styles';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.products);
    const isOpen = useSelector(state => state.cart.isOpen);

    const handleCloseClick = () => {
        dispatch(toggleCart());
    };

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    return (
        <CartContainer isOpen={isOpen}>
            <CloseButton role='check-box' onClick={handleCloseClick} aria-label='close-Cart'>X</CloseButton>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <CartItem key={item.id} role='listitem'>
                            <img src={item.image} alt={item.title} />
                            <figcaption>
                                <p>
                                    {item.title}
                                </p>
                                <p>
                                    ${item.price} &times; {item.quantity}
                                </p>
                            </figcaption>
                            <RemoveButton onClick={() => handleRemove(item.id)} aria-label='remove-Item' role='button'>Remove</RemoveButton>
                        </CartItem>
                    ))}
                </ul>
            )}
        </CartContainer>
    );
};

export default Cart;
