import React from 'react';
import useCart from '../useCart';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../state/products.slice';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock the alert function
global.alert = jest.fn();

// Mock the navigate function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


describe("useCart", () => {
    let store;
    let result;
    const mockNavigate = jest.fn();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    user: {
                        email: 'test@example.com',
                        password: 'password123'
                    },
                    products: [
                        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
                        { id: 2, name: 'Product 2', price: 20, quantity: 2 },
                    ],
                    isOpen: false,
                    isLogin: false
                }
            }
        });
        useNavigate.mockReturnValue(mockNavigate);
        result = renderHook(() => useCart(), { wrapper }).result;
        jest.resetAllMocks(); 
    });

    const wrapper = ({ children }) => (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    );

    it("should toggle cart", () => {
        act(() => {
            result.current.handleCloseClick();
        });
        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.handleCloseClick();
        });
        expect(result.current.isOpen).toBe(false);
    });

    it("should remove product", () => {
        act(() => {
            result.current.handleRemove(1);
        });
        expect(result.current.items).toEqual([
            { id: 2, name: 'Product 2', price: 20, quantity: 2 },
        ]);

        act(() => {
            result.current.handleRemove(2);
        });
        expect(result.current.items).toEqual([
            { id: 2, name: 'Product 2', price: 20, quantity: 1 },
        ]);

        act(() => {
            result.current.handleRemove(2);
        });
        expect(result.current.items).toEqual([]);
    });

    it("should navigate to checkout", () => {
        act(() => {
            result.current.handleCheckout();
        });
        expect(mockNavigate).toHaveBeenCalledWith("/checkout");
    });

    it("should handle login", () => {
        act(() => {
            result.current.handleLogin();
        });
        expect(result.current.isOpen).toBe(true);
        expect(global.alert).toHaveBeenCalledWith("You must be registered and logged in to buy!")
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should render button add some items", () => {
        // Configurar store sin items
        const localStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    user: null,
                    products: [],
                }
            }
        });

        // Crear wrapper local con el store modificado
        const localWrapper = ({ children }) => (
            <BrowserRouter>
                <Provider store={localStore}>
                    {children}
                </Provider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useCart(), { wrapper: localWrapper });

        // Verificar que el botón se renderiza correctamente
        const button = result.current.renderBuyButton();
        expect(button.props.children).toBe("⬅️Add some items, please!");

    });

    it("should render button with styles if is logged in", () => {
        // Configurar store sin items
        const localStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    user: null,
                    products: [
                        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
                    ],
                    isLogin: true
                }
            }
        });

        // Crear wrapper local con el store modificado
        const localWrapper = ({ children }) => (
            <BrowserRouter>
                <Provider store={localStore}>
                    {children}
                </Provider>
            </BrowserRouter>
        );

        const { result } = renderHook(() => useCart(), { wrapper: localWrapper });
        
        // Verificar que el botón se renderiza correctamente
        const button = result.current.renderBuyButton();
        expect(button.props.children).toBe("Buy");
        expect(button.props.className).toBe("buy-button");
    });

    it("should render button with styles if is not logged in", () => {
        const button = result.current.renderBuyButton();
        expect(button.props.children).toBe("Buy");
        expect(button.props.className).toBe("buy-button-disabled");
    });

})