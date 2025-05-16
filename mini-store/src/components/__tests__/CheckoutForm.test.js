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
        
    it("should render all form input fields", () => {
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

    it("should render the 'Simulation Mode' text", () => {
        renderComponent();
        expect(screen.getAllByText(/Simulation Mode/i).length).toBeGreaterThan(0);
    });

    it("should show alert and navigate when completing purchase", () => {
        window.alert = jest.fn();
        renderComponent();
        const button = screen.getByRole("button", { name: /Complete purchase!/i });
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith("You have completed the purchase!");
        expect(mockNavigate).toHaveBeenCalledWith("/postCheckout");
    });

    it("should show default values in all inputs", () => {
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

    it("should allow checking and unchecking the checkbox", () => {
        renderComponent();
        const checkbox = screen.getByLabelText(/Save Payment Method/i);
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("should not submit if the button is not clicked", () => {
        window.alert = jest.fn();
        renderComponent();
        expect(window.alert).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should keep input values controlled and unchanged", () => {
        renderComponent();
        const streetInput = screen.getByLabelText(/Street Address/i);
        fireEvent.change(streetInput, { target: { value: "New Street" } });
        expect(streetInput).toHaveValue("Peachtree Road");
    });
});