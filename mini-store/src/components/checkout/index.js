import React from "react";
import { CheckoutContainer } from "./styles";
import ItemsBuying from "./ItemsBuying";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/home");
    }
    return (
        <CheckoutContainer>
            <button onClick={handleHome}>
                ⬅️Back
            </button>
            <h1>Checkout</h1>
            <ItemsBuying message={"Please, check your items before buying!"} />
            <CheckoutForm />
        </CheckoutContainer>
    );
};

export default Checkout;