import React from "react";
import { CheckoutContainer } from "./styles";
import ItemsBuying from "./ItemsBuying";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    return (
        <CheckoutContainer>
            <h1>Checkout</h1>
            <ItemsBuying message={"Please, check your items before buying!"}/>
            <CheckoutForm />
        </CheckoutContainer>
    );
};

export default Checkout;