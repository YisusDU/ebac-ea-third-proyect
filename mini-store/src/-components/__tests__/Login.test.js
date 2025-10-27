import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login/index";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import productsReducer from "../../state/products.slice"
import { IDLE } from "../../state/status";
import { configureStore } from "@reduxjs/toolkit";
import useAuth from "../../hooks/useAuth";

// Mock the useAuth hook
jest.mock("../../hooks/useAuth");

//Mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe("Login", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const setupState = () => {
        const store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: {
                    status: IDLE,
                }
            }
        })
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </BrowserRouter>
        );
    };

    const mockUseAuth = (email, password) => {
        const mockFunctions = {
            handleValidation: jest.fn(),
            handleRegister: jest.fn(),
            handleGuest: jest.fn(),
        };
    
        useAuth.mockReturnValue({
            emailValid: email,
            passwordValid: password,
            validateInput: jest.fn(),
            ...mockFunctions
        });
    
        return mockFunctions;
    };

    it("should render the title of the page", () => {
        mockUseAuth(true, null);
        setupState();
        const title = screen.getByText(/Mini Store/i);
        expect(title).toBeInTheDocument();
    });

    it("should render the inputs of the form", () => {
        mockUseAuth(true, null);
        setupState();
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it("should have empty class when emailValid is null", () => {
        mockUseAuth(null, null);
        setupState();
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).not.toHaveClass("valid");
        expect(emailInput).not.toHaveClass("invalid");
    });

    it("should have class 'valid' when emailValid is true", () => {
        mockUseAuth(true, null);
        setupState();
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toHaveClass("valid");
    });

    it("should have class 'invalid' when emailValid is false", () => {
        mockUseAuth(false, null);
        setupState();
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toHaveClass("invalid");
    });

    it("should show 'error-message' class and error text when emailValid is false", () => {
        mockUseAuth(false, null);
        setupState();
        const errorSpan = screen.getByText("Incorrect Email");
        expect(errorSpan).toHaveClass("error-message");
    });

    it("should show 'message-space' class and no error text when emailValid is true", () => {
        mockUseAuth(true, null);
        setupState();
        // The span exists but has no text
        const spans = screen.getAllByText((content, element) => element.tagName.toLowerCase() === "span" && content === "");
        expect(spans[0]).toHaveClass("message-space");
    });

    it("should show 'message-space' class and no error text when emailValid is null", () => {
        mockUseAuth(null, null);
        setupState();
        // The span exists but has no text
        const spans = screen.getAllByText((content, element) => element.tagName.toLowerCase() === "span" && content === "");
        expect(spans[0]).toHaveClass("message-space");
    });

    it("should have class 'valid' when passwordValid is true", () => {
        mockUseAuth(true, true);
        setupState();
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toHaveClass("valid");
    });

    it("should have class 'invalid' when passwordValid is false", () => {
        mockUseAuth(false, false);
        setupState();
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toHaveClass("invalid");
    });

    it("should show 'error-message' class and error text when passwordValid is false", () => {
        mockUseAuth(true, false);
        setupState();
        const errorSpan = screen.getByText("Incorrect Password");
        expect(errorSpan).toHaveClass("error-message");
    });

    it("should show 'message-space' class and no error text when passwordValid is true", () => {
        mockUseAuth(true, true);
        setupState();
        // The span exists but has no text
        const spans = screen.getAllByText((content, element) => element.tagName.toLowerCase() === "span" && content === "");
        // The second span is for password (the first is for email)
        expect(spans[1]).toHaveClass("message-space");
    });

    it("should show 'message-space' class and no error text when passwordValid is null", () => {
        mockUseAuth(true, null);
        setupState();
        // The span exists but has no text
        const spans = screen.getAllByText((content, element) => element.tagName.toLowerCase() === "span" && content === "");
        // The second span is for password (the first is for email)
        expect(spans[1]).toHaveClass("message-space");
    });

    it("should render the submit button and call handleValidation on submit", () => {
        const { handleValidation } = mockUseAuth(true, true);
        setupState();
        const button = screen.getByRole("button", { name: /login/i });
        expect(button).toBeInTheDocument();

        // Simulate form submission
        fireEvent.click(button);
        expect(handleValidation).toHaveBeenCalled();
    });

    it("should render the register button and call handleRegister when clicked", () => {
        const { handleRegister } = mockUseAuth(true, true);
        setupState();
        const registerButton = screen.getByRole("button", { name: /go to register!/i });
        expect(registerButton).toBeInTheDocument();
        fireEvent.click(registerButton);
        expect(handleRegister).toHaveBeenCalled();
    });

    it("should render the guest button and call handleGuest when clicked", () => {
        const { handleGuest } = mockUseAuth(true, true);
        setupState();
        const guestButton = screen.getByRole("button", { name: /continue as guest/i });
        expect(guestButton).toBeInTheDocument();
        fireEvent.click(guestButton);
        expect(handleGuest).toHaveBeenCalled();
    });
})