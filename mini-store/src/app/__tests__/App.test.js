import { prettyDOM, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import App from '../index';
import productsReducer from '../../state/products.slice';
import { SUCCEEDED } from '../../state/status';  // Fix the import
import React from 'react';

describe('App', () => {
    let store;
    let user;
    let mockProducts;

    beforeEach(() => {
        mockProducts = [
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

        user = userEvent.setup();
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    products: [],
                    isOpen: false,
                    stock: [mockProducts[0]],
                    status: SUCCEEDED
                }
            }
        });

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it("should render main components", () => {

        expect(screen.getByText('Mini-Store -- v 3.0')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });

    it("should toggle cart when clicking cart button", async () => {

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole('img', { name: 'cart-icon' });
        //console.log("Cart icon found: ", prettyDOM(cartIcon));

        // Click the cart icon
        await user.click(cartIcon);
        console.log("Clicked close button");

        //check if the state has changed
        const state = store.getState();
        expect(state.cart.isOpen).toBe(true);

        // Click the cart icon again
        await user.click(cartIcon);
        const state2 = store.getState();
        expect(state2.cart.isOpen).toBe(false);
    });

    it("should add product to cart", async () => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    products: [],
                    isOpen: false,
                    stock: [mockProducts[0]],
                    status: SUCCEEDED,
                    error: null
                }
            }
        });

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const button = await screen.getAllByText(/Add to Cart/i);
        await user.click(button[1]);

        const state = store.getState().cart;
        expect(state.products).toHaveLength(1);
    });

    it("should remove products from the cart", async () => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    products: [
                        {
                            id: 1,
                            title: "Product 1",
                            price: 10,
                            image: "URL_ADDRESS.placeholder.com/150",
                            quantity: 2,
                        }
                    ],
                    isOpen: false,
                    stock: [mockProducts[0]],
                    status: SUCCEEDED,
                    error: null
                }
            }
        });

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const buttonRemove = screen.getAllByText(/Remove/i)
        await user.click(buttonRemove[0]);
        const state = store.getState().cart;
        expect(state.products).toHaveLength(1);
    })
})