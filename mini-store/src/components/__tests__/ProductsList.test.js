import React from "react";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import ProductsList from "../home/ProductsList/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../../state/products.slice';
import { LOADING, SUCCEEDED, FAILED, IDLE } from '../../state/status';
import axios from "axios";
import { ThemeProvider } from "styled-components";
import theme from "../../theme/index"

//Mock axios
jest.mock('axios');

describe("ProductsList", () => {
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


    const setupState = (status) => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    products: [],
                    isOpen: false,
                    stock: mockProducts,
                    status: status,
                }
            },
        });

        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ProductsList />
                </Provider>
            </ThemeProvider>
        );
        const result = store.getState().cart;
        return result;
    };


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

    it("should add products to cart when the button is clicked", () => {
        setupState(SUCCEEDED);

        const button = screen.getAllByText("Add to Cart");
        fireEvent.click(button[0]);

        const state = store.getState().cart;
        expect(state.products).toHaveLength(1);
    });

    it("should add the products to cart when the button is clicked too fast", () => {

        setupState(SUCCEEDED);

        const button = screen.getAllByText("Add to Cart");
        for (let i = 0; i < 10; i++) {
            fireEvent.click(button[0]);
        }

        const state = store.getState().cart;
        expect(state.products).toHaveLength(1);
        expect(state.products).toHaveLength(1); // Solo debe haber 1 producto
        expect(state.products[0].quantity).toBe(10); // Con cantidad 10
        expect(state.products[0]).toEqual(expect.objectContaining({
            id: mockProducts[0].id,
            title: mockProducts[0].title,
            price: mockProducts[0].price,
        }));
    });

    it("should add several different products to cart", () => {
        // Crear 10 productos diferentes
        const multipleProducts = Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            title: `Product ${index + 1}`,
            price: 10 * (index + 1),
            image: "https://via.placeholder.com/150",
        }));

        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: {
                cart: {
                    stock: multipleProducts,
                    status: SUCCEEDED
                }
            }
        });

        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ProductsList />
                </Provider>
            </ThemeProvider>
        );

        const buttons = screen.getAllByText("Add to Cart");
        // Click en cada botón una vez
        buttons.forEach((button) => {
            fireEvent.click(button);
        });

        const state = store.getState().cart;
        expect(state.products).toHaveLength(10); 
        expect(state.products).toEqual(
            expect.arrayContaining(
                multipleProducts.map(product => expect.objectContaining({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                }))
            )
        );
    });

    it("should render products with correct attributes", () => {
        setupState(SUCCEEDED);

        const productElements = screen.getAllByTestId("product-item");
        productElements.forEach((productElement, index) => {
            const imgElement = within(productElement).getByRole('img');
            const buttonElement = within(productElement).getByRole('button', { name: /Add to Cart/i });

            expect(imgElement).toHaveAttribute('src', mockProducts[index].image);
            expect(imgElement).toHaveAttribute('alt', mockProducts[index].title);
            expect(buttonElement).toBeInTheDocument();
        });
    });

    it("should make a request to the API when the state is IDLE", async () => {
        const fetchProductsMock = jest.spyOn(require('../../state/products.slice'), 'fetchProducts')
            .mockImplementation(() => () => { });

        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: { cart: { stock: [], status: IDLE } }
        });

        render(
            <Provider store={store}>
                <ProductsList />
            </Provider>
        );

        await expect(fetchProductsMock).toHaveBeenCalled();
        fetchProductsMock.mockRestore();
    });

    it("should make a request at the API when the state is IDLE using AXIOS", async () => {
        const mockApiProducts = [
            {
                id: 1,
                title: "Fjallraven Backpack",
                price: 109.95,
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            }
        ];

        axios.get.mockResolvedValue({ data: mockApiProducts });

        setupState(IDLE);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
        });

        const state = store.getState().cart;
        expect(state.stock).toEqual(mockApiProducts);
        expect(state.status).toEqual(SUCCEEDED);
    });

    it("should render the ProductNotFound component when there are no products", () => {
        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: {
                cart: {
                    stock: [],
                    status: SUCCEEDED
                }
            }
        });

        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ProductsList />
                </Provider>
            </ThemeProvider>
        );
        const productNotFound = screen.getByText(/No products found with that search term/i);
        expect(productNotFound).toBeInTheDocument();
    });
});
