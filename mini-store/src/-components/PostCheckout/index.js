import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearProducts } from '../../state/products.slice';
import ItemsBuying from '../checkout/ItemsBuying';
import SVGCheck from './SvgCheck';
import {
    PostCheckoutContainer
} from './styles';

const PostCheckout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBackToHome = () => {
        dispatch( clearProducts());
        navigate('/home');
    }

    return (
        <PostCheckoutContainer>
            <SVGCheck />
            <ItemsBuying message={"Thank you for your purchase!"} />
            <p>
                *You will receive an email confirmation shortly.
            </p>
            <button onClick={handleBackToHome}>
                Back to Home
            </button>
        </PostCheckoutContainer>
    );
};

export default PostCheckout;