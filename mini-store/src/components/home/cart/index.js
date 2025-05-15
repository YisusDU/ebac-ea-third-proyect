import React from 'react';
import useCart from '../../../hooks/useCart';
import { CartContainer, CartItem, RemoveButton, CloseButton } from './styles';
import CartSvg from "./CartSVG/index"

const Cart = () => {
    const {
        items,
        isOpen,
        handleCloseClick, 
        handleRemove,
        renderBuyButton
    } = useCart();
   
    return (
        <CartContainer $isOpen={isOpen}>
            <CloseButton role='check-box' onClick={handleCloseClick} aria-label='close-Cart'>X</CloseButton>
            <h2>Your Cart</h2>
            <hr />
            {items.length === 0 ? (
                <>
                    <CartSvg />
                    <p>No items in the cart!.</p>
                </>
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
                            <RemoveButton
                                onClick={() => handleRemove(item.id)}
                                aria-label='remove-Item'
                                role='button'>Remove
                            </RemoveButton>
                        </CartItem>
                    ))}
                </ul>
            )}
            {renderBuyButton()}
        </CartContainer>
    );
};

export default Cart;
