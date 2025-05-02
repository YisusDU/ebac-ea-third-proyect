import React from "react";
import useProduct from "../useProduct";
import { fetchProducts } from '../../state/products.slice';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../state/products.slice';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FAILED, LOADING, SUCCEEDED, IDLE } from '../../state/status';

let fakeProducts = [{
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
},
{
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
        "rate": 4.1,
        "count": 259
    }
}
]


// Mock the alert function
global.alert = jest.fn();

// Mock the navigate function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../state/products.slice', () => ({
    ...jest.requireActual('../../state/products.slice'),
    fetchProducts: jest.fn(() => Promise.resolve({ type: 'FETCH_PRODUCTS_SUCCESS', payload: fakeProducts }))
}));

describe('useProduct', () => {
    let store;
    let result;
    const mockNavigate = jest.fn();
    const mockDispatch = jest.fn();

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
                    products: [],
                    isOpen: false,
                    searchTerm: '',
                    isLogin: true,
                    status: IDLE,
                    stock: fakeProducts
                }
            }
        });
        useNavigate.mockReturnValue(mockNavigate);
        jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);
        result = renderHook(() => useProduct(), { wrapper }).result;
    });

    const wrapper = ({ children }) => (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    );

    it('should fetch products on initial render', async () => {
        await act(async () => {
            result = renderHook(() => useProduct(), { wrapper }).result;
        });
        expect(mockDispatch).toHaveBeenCalledWith(fetchProducts());
    });

    it('should return filtered products based on searchTerm', () => {
        const testProducts = [
            { id: 1, title: 'Product One', category: 'Category A' },
            { id: 2, title: 'Product Two', category: 'Category B' }
        ];
       const  localStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    ...store.getState().cart,
                    stock: testProducts,
                    searchTerm: 'One'
                }
            }
        });

        const localWrapper = ({ children }) => (
            <BrowserRouter>
                <Provider store={localStore}>
                    {children}
                </Provider>
            </BrowserRouter>
        );

        act(() => {
            result = renderHook(() => useProduct(), {wrapper: localWrapper }).result;
        })
    
        expect(result.current.products).toEqual([testProducts[0]]);
    });

    /* it('should categorize products correctly', () => {
        const testProducts = [
            { id: 1, title: 'Product One', category: 'Category A' },
            { id: 2, title: 'Product Two', category: 'Category B' }
        ];
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    ...store.getState().cart,
                    stock: testProducts
                }
            }
        });

        result = renderHook(() => useProduct(), { wrapper }).result;
        expect(result.current.categorizedProducts).toEqual({
            'Category A': [testProducts[0]],
            'Category B': [testProducts[1]]
        });
    }); */

});