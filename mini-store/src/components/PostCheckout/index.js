import React from 'react';
import ItemsBuying from '../checkout/ItemsBuying';
import SVGCheck from './SvgCheck';
import {
    PostCheckoutContainer
} from './styles';

const PostCheckout = () => {
    return (
        <PostCheckoutContainer>  
            <SVGCheck />
            <ItemsBuying message={"Thank you for your purchase!"}/>
            <p>
                *You will receive an email confirmation shortly.
            </p>
            <button>
                Back to Home
            </button>
        </PostCheckoutContainer>
    );
};

export default PostCheckout;