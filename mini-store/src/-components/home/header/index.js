import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderLogo, HeaderContainer, HeaderSearch, HeaderUser, HeaderCart } from './styles';
import { toggleCart, setSearchTerm, verifyLogin } from '../../../state/products.slice';
import { useNavigate } from "react-router-dom";
import SVGCart from './SvgCart';
import SvgUser from './SvgUser';
import logo from '../../../assets/img/logoEcomm.jpg';

const ProductHeader = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);
    const isLogin = useSelector((state) => state.cart.isLogin);
    const navigate = useNavigate();

    const toggleLogin = () => {
        navigate('/');
        dispatch(verifyLogin(false));
    };

    const handleCloseClick = () => {
        dispatch(toggleCart());
    };

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <HeaderContainer >
            <HeaderLogo>
                <img src={logo} alt="logo-store" />
                <h1><span>Mini Store</span> v3.0</h1>
            </HeaderLogo>
            <HeaderSearch>
                <input type="search" 
                placeholder="Type some item name..." 
                onChange={handleSearch}
                />
                <button>Search 🔍</button>
            </HeaderSearch>
            <HeaderUser onClick={toggleLogin}>
                <SvgUser />
                <p role="button" aria-label='user-name'>{isLogin? 'Log out' : 'Go to Login'}</p>
            </HeaderUser>
            <HeaderCart onClick={handleCloseClick}>
                <SVGCart />
                <span role="button" aria-label='cart-count'>{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;