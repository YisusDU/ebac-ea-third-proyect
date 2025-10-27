import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../state/products.slice";
import ItemsBuying from "../checkout/ItemsBuying";


describe("ItemsBuying", () => {
    const renderComponent = (products, message = "Test message") => {
        const store = configureStore({
            reducer: { cart: productsReducer },
            preloadedState: {
                cart: {
                    products,
                }
            }
        });
        return render(
            <Provider store={store}>
                <ItemsBuying message={message} />
            </Provider>
        );
    };

    it("should render the message prop", () => {
        renderComponent([], "Custom message");
        expect(screen.getByText("Custom message")).toBeInTheDocument();
    });

    it("should render all products in the list", () => {
        const products = [
            { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.jpg", name: "Product 1" },
            { id: 2, title: "Product 2", price: 20, quantity: 1, image: "img2.jpg", name: "Product 2" }
        ];
        renderComponent(products);
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem").length).toBe(2);
    });

    it("should show the correct total price", () => {
        const products = [
            { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.jpg", name: "Product 1" },
            { id: 2, title: "Product 2", price: 20, quantity: 1, image: "img2.jpg", name: "Product 2" }
        ];
        renderComponent(products);
        expect(screen.getByText("Total: $40")).toBeInTheDocument();
    });

    it("should render empty list and total $0 if there are no products", () => {
        renderComponent([]);
        expect(screen.getByText("Your items:")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem").length).toBe(0);
        expect(screen.getByText("Total: $0")).toBeInTheDocument();
    });

    it("should render product with quantity 0 and not add to total", () => {
        const products = [
            { id: 1, title: "Product 1", price: 10, quantity: 0, image: "img1.jpg", name: "Product 1" }
        ];
        renderComponent(products);
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("$10 × 0")).toBeInTheDocument();
        expect(screen.getByText("Total: $0")).toBeInTheDocument();
    });

    it("should render product with negative price or quantity (edge case)", () => {
        const products = [
            { id: 1, title: "Product 1", price: -5, quantity: 2, image: "img1.jpg", name: "Product 1" },
            { id: 2, title: "Product 2", price: 10, quantity: -3, image: "img2.jpg", name: "Product 2" }
        ];
        renderComponent(products);
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        // Total: (-5*2) + (10*-3) = -10 + -30 = -40
        expect(screen.getByText("Total: $-40")).toBeInTheDocument();
    });

    it("should render product with missing image or name gracefully", () => {
        const products = [
            { id: 1, title: "Product 1", price: 10, quantity: 1 }
        ];
        renderComponent(products);
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        // El alt será undefined, pero no debe romper el render
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});