import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import App from "../index";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: {
                cart: {
                    products: [],

                }
            }
        });
    });

    function renderRouter(route) {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={route}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
    }

    it("should display Login on the '/' route", () => {
        renderRouter(['/']);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it("should display Registry on the '/register' route", () => {
        renderRouter(['/register']);
        expect(screen.getByText(/registry/i)).toBeInTheDocument();
    });

    it("should display Home on the '/home' route", () => {
        renderRouter(['/home']);
        expect(screen.getByPlaceholderText("Type some item name...")).toBeInTheDocument();
    });

    it("should display Checkout on the '/checkout' route", () => {
        renderRouter(['/checkout']);
        expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });

    it("should display PostCheckout on the '/postcheckout' route", () => {
        renderRouter(['/postcheckout']);
        expect(screen.getByText(/You will receive an email confirmation shortly./i)).toBeInTheDocument();
    });

});