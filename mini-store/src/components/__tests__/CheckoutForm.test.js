import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "../checkout/CheckoutForm";
import { BrowserRouter } from "react-router-dom";

// Mock the alert and navigate functions
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));


describe("CheckoutForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <CheckoutForm />
            </BrowserRouter>
        );
        
    it("renders all input fields", () => {
        renderComponent();
        expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Street Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Neighborhood/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Card Expiration/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Security Code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Save Payment Method/i)).toBeInTheDocument();
    });

    it("renders the simulation mode text", () => {
        renderComponent();
        expect(screen.getAllByText(/Simulation Mode/i).length).toBeGreaterThan(0);
    });

    it("calls alert and navigates on button click", () => {
        window.alert = jest.fn();
        renderComponent();
        const button = screen.getByRole("button", { name: /Complete purchase!/i });
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith("You have completed the purchase!");
        expect(mockNavigate).toHaveBeenCalledWith("/postCheckout");
    });

    it("should have default values in the inputs", () => {
        renderComponent();
        expect(screen.getByLabelText(/Street Address/i)).toHaveValue("Peachtree Road");
        expect(screen.getByLabelText(/Street Number/i)).toHaveValue(123);
        expect(screen.getByLabelText(/Neighborhood/i)).toHaveValue("Buckhead");
        expect(screen.getByLabelText(/Postal Code/i)).toHaveValue(56480);
        expect(screen.getByLabelText(/City/i)).toHaveValue("Atlanta");
        expect(screen.getByLabelText(/Card Number/i)).toHaveValue(1223456598787845);
        expect(screen.getByLabelText(/Card Expiration/i)).toHaveValue(1834);
        expect(screen.getByLabelText(/Security Code/i)).toHaveValue(126);
    });

    it("checkbox can be checked and unchecked", () => {
        renderComponent();
        const checkbox = screen.getByLabelText(/Save Payment Method/i);
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("does not submit if button is not clicked", () => {
        window.alert = jest.fn();
        renderComponent();
        expect(window.alert).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    // Edge case: try to change a required input (should not change because value is controlled)
    it("input values are controlled and cannot be changed", () => {
        renderComponent();
        const streetInput = screen.getByLabelText(/Street Address/i);
        fireEvent.change(streetInput, { target: { value: "New Street" } });
        expect(streetInput).toHaveValue("Peachtree Road");
    });
});