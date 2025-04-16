import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeProduct } from '../../../state/products.slice';
import { CartContainer, CartItem, RemoveButton, CloseButton, BuyButton } from './styles';
import { useNavigate } from "react-router-dom";
import CartSvg from "./CartSVG/index"

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.products);
    const isOpen = useSelector(state => state.cart.isOpen);
    const isLogin = useSelector((state) => state.cart.isLogin);

    const handleCloseClick = () => {
        dispatch(toggleCart());
    };

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    const handleCheckout = () => {
        navigate("/checkout");
    }

    const handleLogin = () => {
        alert("You must be registered and logged in to buy!");
        dispatch(toggleCart());
        navigate("/");
    }

    const renderBuyButton = () => {
        if (items.length === 0) {
            return (
                <BuyButton className='buy-button' onClick={handleCloseClick}>
                    ⬅️Add some items, please!
                </BuyButton>
            );
        }

        return (
            <BuyButton {...(isLogin 
                ? { className: 'buy-button', onClick: handleCheckout }
                : { className: 'buy-button-disabled', onClick: handleLogin }
            )}>
                Buy
            </BuyButton>
        );
    };

    return (
        <CartContainer isOpen={isOpen}>
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
