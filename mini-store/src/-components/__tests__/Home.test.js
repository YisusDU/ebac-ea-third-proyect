import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../home/index';
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../../state/products.slice';
import { SUCCEEDED, FAILED, LOADING } from '../../state/status';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import theme from "../../theme/index";



describe("Home", () => {
    let store;
    let mockProducts = [
        {
            id: 1,
            title: "Product 1",
            price: 10,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            title: "Product 2",
            price: 20,
            image: "https://via.placeholder.com/150",
        },
    ];

    setupState = (state) => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    isOpen: false,
                    products: [],
                    stock: mockProducts,
                    status: state
                }
            }
        });
        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Provider store={store}>
                        <Home />
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
        const result = store.getState().cart;
        return result;
    };

    it("should render the cart", () => {
        setupState(SUCCEEDED);
        const title = screen.getByText("Your Cart");
        expect(title).toBeInTheDocument();
    });

    it("should renders the header", () => {
        setupState(SUCCEEDED);

        // Variable that renders the header title
        const title = screen.getByText("Mini Store");
        /* console.log("title of the header" + prettyDOM(title)); */

        // Rendering the header title
        expect(title).toBeInTheDocument();
    });

    it("should render loading state", () => {
        setupState(LOADING);
        const loadingTest = screen.getByText(/Loading/)
        expect(loadingTest).toBeInTheDocument();
    });

    it("should render error State", () => {
        setupState(FAILED);
        const errorTest = screen.getByText(/There was an error loading the products./i);
        expect(errorTest).toBeInTheDocument();
    });

    it("should render products", () => {
        setupState(SUCCEEDED);
        const product1 = screen.getByText(mockProducts[0].title);
        const product2 = screen.getByText(mockProducts[1].title);

        expect(product1).toBeInTheDocument();
        expect(product2).toBeInTheDocument();
    });

})