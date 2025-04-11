import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderLogo, HeaderContainer, HeaderSearch, HeaderCart } from './styles';
import { toggleCart, setSearchTerm } from '../../../state/products.slice';
import SVGComponent from './SvgHeader';
import logo from '../../../assets/img/logoEcomm.jpg';

const ProductHeader = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);

    const handleCloseClick = () => {
        dispatch(toggleCart());
    };

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }

    return (
        <HeaderContainer >
            <HeaderLogo>
                <img src={logo} alt="logo-store" />
                <h1><span>Mini Store</span> v3.0</h1>
            </HeaderLogo>
            <HeaderSearch>
                <input type="text" 
                placeholder="Type some item name..." 
                onChange={handleSearch}
                />
                <button>Search 🔍</button>
            </HeaderSearch>
            <HeaderCart onClick={handleCloseClick}>
                <SVGComponent />
                <span role="button" aria-label='cart-Count'>{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;