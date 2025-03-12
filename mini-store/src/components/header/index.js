import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer, HeaderTitle, HeaderCart } from './styles';
import { toggleCart } from '../../state/products.slice';
import SVGComponent from './svgHeader';

const ProductHeader = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);

    const handleCloseClick = () => {
        dispatch(toggleCart());
    };

    return (
        <HeaderContainer >
            <HeaderTitle>Mini-Store -- v 3.0</HeaderTitle>
            <HeaderCart onClick={handleCloseClick}>
                <SVGComponent />
                <span role="button" aria-label='cart-Count'>{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;