import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useAuth from '../useAuth';
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

describe("useAuth", () => {
    let store;
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
                    }
                }
            }
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    const wrapper = ({ children }) => (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    );

    it(" should validate the email", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        const mockEvent = {
            target: {
                name: 'email',
                value: 'test@example.com'
            }
        };

        act(() => {
            result.current.validateInput(mockEvent);
        });
        expect(result.current.emailValid).toBe(true);
    });

    it("should invalidate incorrect email", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        const mockEvent = {
            target: {
                name: 'email',
                value: 'wrong@example.com'
            }
        };

        act(() => {
            result.current.validateInput(mockEvent);
        });
        expect(result.current.emailValid).toBe(false);
    });

    it("should validate the password", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        const mockEvent = {
            target: {
                name: 'password',
                value: 'password123'
            }
        };

        act(() => {
            result.current.validateInput(mockEvent);
        });
        expect(result.current.passwordValid).toBe(true);
    });

    it("should invalidate incorrect password", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        const mockEvent = {
            target: {
                name: 'password',
                value: 'wrongpassword'
            }
        };

        act(() => {
            result.current.validateInput(mockEvent);
        });
        expect(result.current.passwordValid).toBe(false);
    });


    it("should navigate to register", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => {
            result.current.handleRegister();
        });

        expect(mockNavigate).toHaveBeenCalledWith("/register");
    });

    it("should navigate as guest", () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => {
            result.current.handleGuest();
        });

        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });

    it("should handle no registered user", () => {
        // Configurar store sin usuario registrado
        const localStore = configureStore({
            reducer: {
                cart: productsReducer
            },
            preloadedState: {
                cart: {
                    user: null
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

        const { result } = renderHook(() => useAuth(), { wrapper: localWrapper });

        // Simular un elemento de formulario HTML
        const formElement = document.createElement('form');
        const emailInput = document.createElement('input');
        emailInput.name = 'email';
        emailInput.value = 'test@example.com';
        const passwordInput = document.createElement('input');
        passwordInput.name = 'password';
        passwordInput.value = 'password123';
        formElement.appendChild(emailInput);
        formElement.appendChild(passwordInput);

        const mockEvent = {
            preventDefault: jest.fn(),
            target: formElement
        };

        act(() => {
            result.current.handleValidation(mockEvent);
        });

        // Verificar que se muestre la alerta correcta
        expect(global.alert).toHaveBeenCalledWith('No registered users found. Please register first.');
        // Verificar que los estados de validación sean falsos
        expect(result.current.emailValid).toBe(false);
        expect(result.current.passwordValid).toBe(false);
    });

    it("should handle successful login", () => {
        const { result } = renderHook(() => useAuth(), { wrapper});

        // Simular un elemento de formulario HTML
        const formElement = document.createElement('form');
        const emailInput = document.createElement('input');
        emailInput.name = 'email';
        emailInput.value = 'test@example.com';
        const passwordInput = document.createElement('input');
        passwordInput.name = 'password';
        passwordInput.value = 'password123';
        formElement.appendChild(emailInput);
        formElement.appendChild(passwordInput);

        const mockEvent = {
            preventDefault: jest.fn(),
            target: formElement
        };

        act(() => {
            result.current.handleValidation(mockEvent);
        });

        // Verificar que se muestre la alerta correcta
        expect(global.alert).toHaveBeenCalledWith('Login successful!');
        // Verificar que los estados de validación sean falsos
        expect(result.current.emailValid).toBe(true);
        expect(result.current.passwordValid).toBe(true);
    });

    it("should handle incorrect login", () => {
        const { result } = renderHook(() => useAuth(), { wrapper});

        // Simular un elemento de formulario HTML
        const formElement = document.createElement('form');
        const emailInput = document.createElement('input');
        emailInput.name = 'email';
        emailInput.value = 'test@example.co';
        const passwordInput = document.createElement('input');
        passwordInput.name = 'password';
        passwordInput.value = 'password12';
        formElement.appendChild(emailInput);
        formElement.appendChild(passwordInput);

        const mockEvent = {
            preventDefault: jest.fn(),
            target: formElement
        };

        act(() => {
            result.current.handleValidation(mockEvent);
        });

        // Verificar que se muestre la alerta correcta
        expect(global.alert).toHaveBeenCalledWith('Invalid email or password');
        // Verificar que los estados de validación sean falsos
        expect(result.current.emailValid).toBe(false);
        expect(result.current.passwordValid).toBe(false);
    });

});