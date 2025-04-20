import React from "react";
import { CheckoutFormContainer, CheckoutPortade, CheckoutFormBuy } from "./styles";
import { useNavigate} from "react-router-dom";



const CheckoutForm = () => {
    const navigate = useNavigate();

    const buttonCLicked = (e) => {
        e.preventDefault();
        alert("You have completed the purchase!");
        navigate("/postCheckout");
    }

    return (
        <CheckoutFormContainer>
            <CheckoutFormBuy>
                <fieldset>
                    <i>"Simulation Mode"</i>
                    <legend>Shipping Address</legend>
                    <label htmlFor="street">Street Address</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Enter street name"
                        required
                        tabIndex={1}
                        value={"Peachtree Road"}
                    />
                    <label htmlFor="streetNumber">Street Number</label>
                    <input
                        type="number"
                        id="streetNumber"
                        name="streetNumber"
                        placeholder="Enter street number"
                        required
                        tabIndex={2}
                        value={123}
                    />
                    <label htmlFor="neighborhood">Neighborhood</label>
                    <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        placeholder="Enter neighborhood"
                        required
                        tabIndex={3}
                        value={"Buckhead"}
                    />
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Enter postal code"
                        maxLength={7}
                        required
                        tabIndex={4}
                        value={56480}
                    />
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        required
                        tabIndex={5}
                        value={"Atlanta"}
                    />
                </fieldset>
                <fieldset>
                    <legend>Payment Information</legend>
                    <i>"Simulation Mode"</i>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="number"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Enter your card number"
                        maxLength={16}
                        value={1223456598787845}
                        required
                        tabIndex={6}
                    />
                    <label htmlFor="expiration">Card Expiration (MMYY)</label>
                    <input
                        type="number"
                        id="expiration"
                        name="expiration"
                        placeholder="MMYY"
                        maxLength={4}
                        value={1834}
                        required
                        tabIndex={7}
                    />
                    <label htmlFor="securityCode">Security Code (CVV)</label>
                    <input
                        type="number"
                        id="securityCode"
                        name="securityCode"
                        placeholder="CVV"
                        maxLength={3}
                        value={126}
                        required
                        tabIndex={8}
                    />
                    <label htmlFor="savePayment">Save Payment Method</label>
                    <input
                        type="checkbox"
                        id="savePayment"
                        name="savePayment"
                        tabIndex={9}
                    />
                </fieldset>
                <button onClick={buttonCLicked}>Complete purchase!</button>
            </CheckoutFormBuy>
            <CheckoutPortade />
        </CheckoutFormContainer>
    );
}

export default CheckoutForm;