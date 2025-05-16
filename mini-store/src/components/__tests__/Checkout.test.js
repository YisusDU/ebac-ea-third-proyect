import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import Checkout from "../checkout/index"
import { BrowserRouter} from "react-router-dom";

//mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Checkout", () => {
    const renderComponent = () => {
        const store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: {
                cart: {
                    products: []
                }
            }
        });
        return render(
            <BrowserRouter>
                <Provider store={store}>
                    <Checkout />
                </Provider>
            </BrowserRouter>
        );
    };

    it("should render the message prop", () => {
        renderComponent();
        const message = screen.getByText(/Please, check your items before buying!/i)
        expect(message).toBeInTheDocument();
    });

    it("should render all form input fields", () => {
        renderComponent();
        expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Street Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Neighborhood/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Card Expiration/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Security Code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Save Payment Method/i)).toBeInTheDocument();
    });

    it("should navigate to home when back button is clicked", () => {
        renderComponent();
        const backButton = screen.getByText(/⬅️Back/i);
        fireEvent.click(backButton);

        expect(backButton).toBeInTheDocument();
        expect(mockNavigate).toHaveBeenCalledWith("/home")
    });

})
