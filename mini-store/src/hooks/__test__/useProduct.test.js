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

// Define el mock a nivel de módulo
jest.mock('../../state/products.slice', () => ({
    ...jest.requireActual('../../state/products.slice'),
    fetchProducts: jest.fn()
}));

describe('useProduct', () => {
    let store;
    let result;


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
        fetchProducts.mockReturnValue({ type: 'products/fetchProducts' });
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

    const setupHook = (searchTerm = '') => {
        const testStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    stock: fakeProducts,
                    status: SUCCEEDED,
                    searchTerm: searchTerm
                }
            }
        });
        
        const wrapper = ({ children }) => (
            <BrowserRouter>
                <Provider store={testStore}>
                    {children}
                </Provider>
            </BrowserRouter>
        );
        
        const hookResult = renderHook(() => useProduct(), { wrapper });
        
        return {
            result: hookResult.result,
            store: testStore
        };
    };
    
    it('debería devolver todos los productos cuando el término de búsqueda está vacío', () => {
        const { result, store } = setupHook('');
        
        // Ahora store está definido correctamente
        console.log("Estado del store:", store.getState().cart);
        console.log("Productos filtrados:", result.current.products);
        console.log("Término de búsqueda:", result.current.searchTerm);
        
        // Verificar que devuelve todos los productos disponibles
        expect(result.current.products).toHaveLength(fakeProducts.length);
        expect(result.current.products).toEqual(fakeProducts);
    });

});