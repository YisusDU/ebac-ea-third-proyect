import React from "react";
import { CheckoutContainer } from "./styles";
import ItemsBuying from "./ItemsBuying";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    return (
        <CheckoutContainer>
            <h1>Checkout</h1>
            <ItemsBuying />
            <CheckoutForm />
        </CheckoutContainer>
    );
};

export default Checkout;