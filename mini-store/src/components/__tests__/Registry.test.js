import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Registry from "../Registry/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import { BrowserRouter } from "react-router-dom";
import { prettyDOM } from "@testing-library/react";

// Mock navigate and alert
const mockNavigate = jest.fn();
window.alert = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Registry", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: { cart: {} }
        });
        jest.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Registry />
                </Provider>
            </BrowserRouter>
        );

    it("should render the title and form fields", () => {
        renderComponent();
        expect(screen.getByText(/Registry/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm your Password:/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
    });

    it("should register a user and navigate to login", () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "john@test.com" } });
        fireEvent.change(screen.getByLabelText(/^Password:/i), { target: { value: "Password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm your Password:/i), { target: { value: "Password123" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));

        expect(window.alert).toHaveBeenCalledWith("User added successfully");
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should not register if passwords do not match", () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "Jane" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "jane@test.com" } });
        fireEvent.change(screen.getByLabelText(/^Password:/i), { target: { value: "Password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm your Password:/i), { target: { value: "DifferentPass" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));

        expect(window.alert).toHaveBeenCalledWith("Passwords do not match");
        expect(window.alert).not.toHaveBeenCalledWith("User added successfully");
        expect(mockNavigate).not.toHaveBeenCalledWith("/");
    });

    it("should not register if any field is empty", async () => {
        renderComponent();
        await userEvent.clear(screen.getByLabelText(/Name:/i));
        await userEvent.clear(screen.getByLabelText(/Email:/i));
        await userEvent.clear(screen.getByLabelText(/^Password:/i));
        await userEvent.clear(screen.getByLabelText(/Confirm your Password:/i));
        await userEvent.click(screen.getByRole("button", { name: /Register/i }));

        expect(window.alert).not.toHaveBeenCalledWith("User added successfully");
        expect(mockNavigate).not.toHaveBeenCalledWith("/");
    });

    it("should navigate to login when 'Go to Sign In' is clicked", () => {
        renderComponent();
        fireEvent.click(screen.getByText("Go to Sign In"));
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should handle error in dispatch", () => {

        store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: { cart: {} }
        });
        // Simulate error in dispatch
        const originalDispatch = store.dispatch;
        store.dispatch = () => { throw new Error("Simulated error"); };
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Registry />
                </Provider>
            </BrowserRouter>
        );
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "john@test.com" } });
        fireEvent.change(screen.getByLabelText(/^Password:/i), { target: { value: "Password123" } });
        fireEvent.change(screen.getByLabelText(/Confirm your Password:/i), { target: { value: "Password123" } });
        const registerButton = screen.getByRole("button", { name: /Register/i });
        fireEvent.click(registerButton);

        expect(window.alert).toHaveBeenCalledWith("Error adding user");
        // Restaura el dispatch original
        store.dispatch = originalDispatch;
    });
});