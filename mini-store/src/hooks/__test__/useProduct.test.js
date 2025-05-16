import React from "react";
import useProduct from "../useProduct";
import { fetchProducts } from '../../state/products.slice';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "../../state/products.slice.js";
import { BrowserRouter } from 'react-router-dom';
import { FAILED, LOADING, SUCCEEDED, IDLE } from '../../state/status';

let fakeProducts = [{
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
},
{
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
        "rate": 4.1,
        "count": 259
    }
}
];

// Mock the alert function
global.alert = jest.fn();


describe('useProduct', () => {
    let store;
    let result;

    const setupState = (state) => {
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    stock: [],
                    status: state,
                    searchTerm: ''
                }
            }
        });

        const { result } = renderHook(() => useProduct(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </BrowserRouter>
            )
        });
        return result;
    };

    it("should check the initial state", () => {
        jest.spyOn(require('../../state/products.slice'), 'fetchProducts').
            mockReturnValue({ type: 'products/fetchProducts' });

        expect(setupState(IDLE).current.status).toBe(IDLE);
        expect(setupState("").current.status).toBe(IDLE);
        expect(setupState(LOADING).current.status).not.toBe(IDLE);
        expect(setupState(LOADING).current.status).toBe(LOADING);
    });

    it("should check the stock of initial state", () => {
        /* jest.spyOn(require('../../state/products.slice'), 'fetchProducts').
            mockReturnValue({ type: 'products/fetchProducts' }); */
        // Configurar el store con estado IDLE
        const setupState = (state) => {
            store = configureStore({
                reducer: {
                    cart: productsReducer
                },
                preloadedState: {
                    cart: {
                        stock: state,
                        status: SUCCEEDED,
                        searchTerm: ''
                    }
                }
            });

            const { result } = renderHook(() => useProduct(), {
                wrapper: ({ children }) => (
                    <BrowserRouter>
                        <Provider store={store}>
                            {children}
                        </Provider>
                    </BrowserRouter>
                )
            });
            return result;
        }
        /* console.log(setupState(fakeProducts).current.products); */
        expect(setupState(fakeProducts).current.products).not.toEqual([]);
        expect(setupState(fakeProducts).current.products).toEqual(fakeProducts);
        expect(setupState().current.products).toEqual([]);
    });


    it('should call fetchProducts when status is IDLE', () => {
        // Configurar el store con estado IDLE
        store = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    stock: [],
                    status: IDLE,
                    searchTerm: ''
                }
            }
        });
        // Configura el mock para la primera prueba
        jest.spyOn(require('../../state/products.slice'), 'fetchProducts').
            mockReturnValue({ type: 'products/fetchProducts' });
        const wrapper = ({ children }) => (
            <BrowserRouter>
                <Provider store={store}>
                    {children}
                </Provider>
            </BrowserRouter>
        );

        result = renderHook(() => useProduct(), { wrapper }).result;
        // Verificar que fetchProducts fue llamado
        expect(fetchProducts).toHaveBeenCalled();
        expect(result.current.status).toBe(IDLE);
    });


    it("should dispatch addProduct action when handleAddToCart is called", () => {
        // Importar el módulo completo para poder espiarlo correctamente
        const productsSlice = require('../../state/products.slice');

        // Espiar la función addProduct correctamente
        jest.spyOn(productsSlice, 'addProduct');

        // Configurar un store específico para esta prueba
        const testStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    stock: fakeProducts,
                    status: SUCCEEDED, // Usamos SUCCEEDED para evitar que se llame a fetchProducts
                    searchTerm: '',
                    products: [] // Carrito vacío inicialmente
                }
            }
        });

        // Renderizar el hook con el store específico
        const { result } = renderHook(() => useProduct(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <Provider store={testStore}>
                        {children}
                    </Provider>
                </BrowserRouter>
            )
        });

        // Producto de prueba
        const testProduct = fakeProducts[0];

        // Llamar a handleAddToCart
        act(() => {
            result.current.handleAddToCart(testProduct);
        });

        // Verificar que addProduct fue llamado con los datos correctos
        expect(productsSlice.addProduct).toHaveBeenCalledWith({
            id: testProduct.id,
            title: testProduct.title,
            price: testProduct.price,
            image: testProduct.image
        });
    });


    it("should categorize products correctly", () => {
        // Configurar el store con productos
        const testStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            preloadedState: {
                cart: {
                    stock: [
                        { id: 1, title: "Camiseta", category: "men's clothing", price: 10, image: "img1.jpg" },
                        { id: 2, title: "Pantalón", category: "men's clothing", price: 20, image: "img2.jpg" }
                    ],
                    status: SUCCEEDED,
                    searchTerm: "",
                }
            }
        });

        // Renderizar el hook con el store específico
        const { result } = renderHook(() => useProduct(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <Provider store={testStore}>
                        {children}
                    </Provider>
                </BrowserRouter>
            )
        });

        // Verificar que los productos estén correctamente categorizados
        expect(Object.keys(result.current.categorizedProducts)).toEqual(["men's clothing"]);
        expect(result.current.categorizedProducts["men's clothing"]).toHaveLength(2);

        // Verificar que los productos estén en las categorías correctas
        expect(result.current.categorizedProducts["men's clothing"][0].id).toBe(1);
        expect(result.current.categorizedProducts["men's clothing"][1].id).toBe(2);
    });

});