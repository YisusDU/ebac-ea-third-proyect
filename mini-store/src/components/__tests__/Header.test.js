import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../home/header/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { prettyDOM } from "@testing-library/dom";
import productsReducer from "../../state/products.slice.js";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mock the navigate function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


describe("Header", () => {
    let store;
    const mockNavigate = jest.fn();
    beforeEach(() => {
        handleToggleCart = jest.fn();

        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    products: [],
                    stock: [],
                    status: 'idle',
                    searchTerm: ""
                }
            }
        });

        useNavigate.mockReturnValue(mockNavigate);

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header handleToggleCart={handleToggleCart} />
                </Provider>
            </BrowserRouter>
        );
        jest.resetAllMocks();
    })

    it("renders the header", () => {
        // Variable that renders the header title
        const title = screen.getByText("Mini Store");
        /* console.log("title of the header" + prettyDOM(title)); */

        // Rendering the header title
        expect(title).toBeInTheDocument();
    });

    it("should contain the svg ", () => {

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img", { name: "cart-icon" });

        // Check if the cart icon is in the header
        expect(cartIcon).toBeInTheDocument();
    });

    it("should call the toggleCart function when the cart icon is clicked", () => {
        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img", { name: "cart-icon" });
      /*   console.log("Header_cartIcon:" + prettyDOM(cartIcon)); */

        // Click the cart icon
        fireEvent.click(cartIcon.parentElement);
        // Check if the toggleCart function was called
        const state = store.getState();
        expect(state.cart.isOpen).toBe(true);
    });

    it("should display the correct number of items in the cart", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                        { id: 2, quantity: 2, price: 20, name: "Product 2" },
                    ],
                    stock: [],
                    status: 'idle'
                }
            }
        });


        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header handleToggleCart={handleToggleCart} />
                </Provider>
            </BrowserRouter>
        );
        let cartCount = screen.getAllByRole("button", { name: "cart-count" });
        /* console.log("Quantity of products:" + prettyDOM(cartCount[1])); */

        expect(cartCount[1]).toBeInTheDocument();
        expect(cartCount[1]).toHaveTextContent("3");

    });


    it("should display '0' when the cart is empty", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                /*  isOpen: false, */
                cart: {
                    products: [],
                },
            },
        });
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );
        const state = store.getState();
        let cartCount = screen.getAllByRole("button", { name: "cart-count" });
        /* console.log("button cart empty:" + prettyDOM(cartCount[1])); */

        expect(cartCount[1]).toHaveTextContent("0");
        expect(state.cart.products.length).toBe(0);
    });

    it("should display '1' when there is one item in the cart", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                /* isOpen: false, */
                cart: {
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                    ],
                },
            },
        });
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );
        const cartCount = screen.getAllByRole("button", { name: "cart-count" });
        /* console.log("button cart empty:" + prettyDOM(cartCount[1])); */
        expect(cartCount[1]).toHaveTextContent("1");
    });

    it("should to call toggleLogin when the button user is clicked", () => {
        const userButton = screen.getByRole("button", { name: "user-name" });
        fireEvent.click(userButton.parentElement);

        expect(mockNavigate).toHaveBeenCalledWith("/");
        const state = store.getState();
        expect(state.cart.isLogin).toBe(false);
    });

    it("should dispatch setSearchTerm when the search input is changed", async() => {
        const searchInput = screen.getByPlaceholderText("Type some item name...");
        await userEvent.type(searchInput, "camisa");

        const state = store.getState();
        expect(state.cart.searchTerm).toBe("camisa");
    });

    it("should render the correct button when the user is logged out", () => {
        const userButton = screen.getByRole("button", {name: "user-name"});
        const loginText = ["Log out", "Go to Login"];

        expect(userButton).toBeInTheDocument();
        expect(userButton.parentElement).toHaveTextContent(loginText[1]);
        expect(userButton.parentElement).not.toHaveTextContent(loginText[0]);
    });

    it("should render the correct button when the user is logged in", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    isLogin: true,
                    products: [],
                },
            },
        });
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </BrowserRouter>        
        );
        const loginText = ["Log out", "Go to Login"];
        const textContainer = screen.getByText(loginText[0]);
        const textContainer2 = screen.queryByText(loginText[1]);


        expect(textContainer).toBeInTheDocument();
    });
    

    it("should have accessible roles and attributes", () => {
        const cartIcon = screen.getByRole("img", { name: "cart-icon" });
        expect(cartIcon).toHaveAttribute("alt", "cart-icon");
        const cartButton = screen.getByRole("button", { name: "cart-count" });
        expect(cartButton).toHaveAttribute("aria-label", "cart-count");
    });
});




