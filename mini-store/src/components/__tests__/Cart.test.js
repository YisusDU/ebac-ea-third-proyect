import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import Cart from "../home/Cart/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import { BrowserRouter } from 'react-router-dom';


// Mock the navigate function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe("cart", () => {
    let store;
    let handleRemove;
    let handleToggleCart;
    let isOpen;

    beforeEach(() => {
        handleRemove = jest.fn();
        handleToggleCart = jest.fn();
        isOpen = false; // Initialize isOpen

        // Simulate the store
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    isOpen: false,
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                        { id: 2, quantity: 1, price: 10, name: "Product 2" },
                    ],
                },
            },
        });


        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );
        jest.resetAllMocks();
    });

    it("should render the cart", () => {
        const title = screen.getByText("Your Cart");
        expect(title).toBeInTheDocument();
    });

    it('should render the close button', () => {
        const closeButton = screen.getByText("X");
        expect(closeButton).toBeInTheDocument();
    });

    it("should to display that cart is empty", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    isOpen: true,
                    products: [],
                },
            },
        });
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
        const emptyCart = screen.getByText("No items in the cart!.");
        expect(emptyCart).toBeInTheDocument();
        const state = store.getState();
        expect(state.cart.products.length).toBe(0);
    });

    it("should display the correct number of items in the cart", () => {
        let state = store.getState();
        expect(state.cart.products.length).toBe(2);

        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    isOpen: true,
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                        { id: 2, quantity: 1, price: 10, name: "Product 2" },
                        { id: 3, quantity: 1, price: 10, name: "Product 3" },
                        { id: 4, quantity: 1, price: 10, name: "Product 4" },
                        { id: 5, quantity: 1, price: 10, name: "Product 5" },
                    ],
                },
            },
        });
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
        state = store.getState();
        expect(state.cart.products.length).toBe(5);
    });

    it("should to call the removeProduct function", () => {
        const buttonRemove = screen.getAllByRole("button", { name: /remove-Item/ });
        fireEvent.click(buttonRemove[0]);

        // Define state after the click action
        const state = store.getState();
        expect(state.cart.products.length).toBe(1);
    });

    it("should call the toggleCart function when the close icon is clicked", () => {
        // Variable that contains the cart icon
        const closeButton = screen.getByText("X");

        // Click the cart icon
        fireEvent.click(closeButton);
        /* console.log("Clicked close button"); */

        //check if the state has changed
        const state = store.getState();
        expect(state.cart.isOpen).toBe(true);

        // Click the cart icon again
        fireEvent.click(closeButton);
        const state2 = store.getState();
        expect(state2.cart.isOpen).toBe(false);

    });

    it("should to check if the cart is open or closed", () => {
        // Check if the cart is closed
        let state = store.getState();
        expect(state.cart.isOpen).toBe(false);

        // Simulate the click on the close button
        const closeButton = screen.getByText("X");
        fireEvent.click(closeButton);

        // Verify the state after the click
        state = store.getState(); // Re-fetch the state after the click
        /* console.log(`isOpen after click: ${state.cart.isOpen}`); */
        expect(state.cart.isOpen).toBe(true);
    });

    it("should to change the style when CloseButton is clicked", () => {
        const component = render(
            <Provider store={store}>
                <Cart handleRemove={handleRemove} handleToggleCart={handleToggleCart} isOpen={isOpen} />
            </Provider>
        )
        const closeButton = component.getAllByText("X");
        //parentElement
        const parentElement = closeButton[1].parentNode;

        //Get the styles for parentElement
        const parentStyles = window.getComputedStyle(parentElement);
       /*  console.log("ParentElement Styles:" + JSON.stringify(parentStyles)); */

        expect(parentElement).toHaveStyle('right: -100%');


        //simulated some click
        fireEvent.click(closeButton[1]);

        const { rerender } = component;
        rerender(
            <Provider store={store}>
                <Cart handleRemove={handleRemove} handleToggleCart={handleToggleCart} isOpen={isOpen} />
            </Provider>
        );
        //update the components styles
        const updatedParentStyles = window.getComputedStyle(parentElement);
        /* console.log("Updated ParentElement Styles:", JSON.stringify(updatedParentStyles)); */

        //should change the styles
        expect(parentElement).toHaveStyle('right: 20px');

    });

    it('should have accessible roles and attributes', () => {
        const closeButton = screen.getByText("X");
        expect(closeButton).toHaveAttribute('aria-label', 'close-Cart');
        const removeButtons = screen.getAllByText('Remove');
        removeButtons.forEach(button => {
            expect(button).toHaveAttribute('aria-label', 'remove-Item');
        });
    });
});
