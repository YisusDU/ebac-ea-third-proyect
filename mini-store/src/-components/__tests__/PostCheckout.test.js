import React from "react";
import PostCheckout from "../PostCheckout/index";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import { Provider } from "react-redux";
import { prettyDOM } from "@testing-library/react";

//mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}))

describe("PostCheckout", () => {
    let store;

    const testProducts = [
        {
            id: 1,
            name: "Product 1",
            price: 10,
            quantity: 2,
        },
        {
            id: 2,
            name: "Product 2",
            price: 5,
            quantity: 3,
        },
    ];

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    products: testProducts,
                },
            }
        });
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <PostCheckout />
                </Provider>
            </BrowserRouter>
        );

    });

    it("should render the component", () => {
        const testText = screen.getByText(/You will receive an email confirmation shortly./);
        expect(testText).toBeInTheDocument();
    });

    it("should render the SVG component" , () => {
        const testSVG = screen.getByRole("img", {name: "check"});
        expect(testSVG).toBeInTheDocument();
    });

    it("should render the ItemsBuying component", () => {
        const testMesage = screen.getByText(/Thank you for your purchase!/);
        expect(testMesage).toBeInTheDocument();
    });

    it("should have the products in the ItemsBuying component" , () => {
        const testProducts = screen.getAllByRole("listitem");
        expect(testProducts.length).toBe(2);
        expect(testProducts.length).not.toBe(3);
    });

    it("should navigate to home when the button is clicked", () => {
        const testButton = screen.getByRole("button", {name: "Back to Home"});
        fireEvent.click(testButton);
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });

});