import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeProduct } from '../state/products.slice';
import { BuyButton } from '../components/home/Cart/styles';
import { useNavigate } from "react-router-dom";


const useCart = () => {
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

    return {
        items,
        isOpen,
        handleCloseClick, 
        handleRemove,
        renderBuyButton,
        handleCheckout,
        handleLogin,
    };
};

export default useCart;