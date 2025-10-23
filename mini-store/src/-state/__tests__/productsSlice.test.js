import productsReducer, {
    addProduct,
    fetchProducts,
    removeProduct,
    toggleCart,
    updateItems,
    setSearchTerm,
    clearProducts,
    addUser,
    verifyLogin
} from "../products.slice";
import axios from "axios";
jest.mock("axios");

describe("products slice", () => {
    const initialState = {
        products: [],
        stock: [],
        status: "idle",
        isOpen: false,
        searchTerm: '',
        user: [],
        isLogin: false,
    };


    it("should handle addProduct", () => {
        const product = { id: 1, title: "Product 1", price: 10 };
        const action = addProduct(product);
        const state = productsReducer(initialState, action);

        expect(state.products).toEqual([{ ...product, quantity: 1 }]);
    });

    it("should handle removeProduct", () => {
        const product = { id: 1, title: "Product 1", price: 10, quantity: 1 };
        const initialStateWithProduct = {
            ...initialState,
            products: [product],
        };

        const action = removeProduct(product.id);
        const state = productsReducer(initialStateWithProduct, action);

        expect(state.products).toEqual([]);
        expect(state.products.length).toEqual(0);

        expect(state.isOpen).toBe(false)
    });

    it("should handle toggleCart", () => {
        const action = toggleCart();
        const state = productsReducer(initialState, action);

        expect(state.isOpen).toBe(true);

        const nextState = productsReducer(state, action);
        expect(nextState.isOpen).toBe(false);
    });

    it("should handle setSearchTerm", () => {
        const action = setSearchTerm("searchTerm");
        const state = productsReducer(initialState, action);

        expect(state.searchTerm).toEqual("searchTerm");
    });

    it("should handle clearProducts", () => {
        const initialStateWithProducts = {
            ...initialState,
            products: [{ id: 1, title: "Product 1" }],
        };

        const action = clearProducts();
        const state = productsReducer(initialStateWithProducts, action);

        expect(state.products).toEqual([]);
    });

    it("should handle addUser", () => {
       const action = addUser({
            name: "John Doe",
            email: "EMAIL",
            password: "password123",
        });
        const state = productsReducer(initialState, action); 
        expect(state.user).toEqual({
            name: "John Doe",
            email: "EMAIL",
            password: "password123",
        });
    });

    it("should handle verifyLogin", () => {
        const action = verifyLogin(true);
        const state = productsReducer(initialState, action);

        expect(state.isLogin).toBe(true);
    });

    it("should handle undefined items array", () => {
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(undefined, product, 1);
        expect(updatedItems).toEqual([{ ...product, quantity: 1 }]);
    });

    it("should remove item when quantity becomes zero", () => {
        const items = [
            { id: 1, title: "Product 1", price: 10, quantity: 1 }
        ];
        const updatedItems = updateItems(items, { id: 1 }, -1);
        expect(updatedItems).toEqual([]);
    });

    it("should change to pending when fetch is in progress", () => {
        const action = { type: fetchProducts.pending.type };
        const state = productsReducer(initialState, action);

        expect(state.status).toEqual("loading");
    });

    it("should change to fulfilled when fetch completed", () => {
        const action = { type: fetchProducts.fulfilled.type };
        const state = productsReducer(initialState, action);

        expect(state.status).toEqual("succeeded");
    });

    it("should change to failed when fetch rejected", () => {
        const action = { type: fetchProducts.rejected.type };
        const state = productsReducer(initialState, action);

        expect(state.status).toEqual("failed");
    });

    it("should fetch the products from API", async () => {
        const mockProduct = [{ id: 1, title: "Product 1" }];
        axios.get.mockResolvedValue({ data: mockProduct });

        const dispatch = jest.fn();
        const getState = jest.fn();

        await fetchProducts()(dispatch, getState, null);

        expect(axios.get).toHaveBeenCalledWith("https://fakestoreapi.com/products");
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: fetchProducts.fulfilled.type,
                payload: mockProduct,
            })
        );
    });

    it("should catch the error when API fetch fail", async () => {
        // spy on console.error
        const consoleSpy = jest.spyOn(console, "error");
        // Mock an error on the fetch
        const mockError = "Network error, try later";
        axios.get.mockRejectedValue(new Error(mockError));

        // Call the function
        const dispatch = jest.fn();
        const getState = jest.fn();

        await fetchProducts()(dispatch, getState, null);

        // check that console.error was called
        expect(consoleSpy).toHaveBeenCalled();

        // check that the error is caught
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: fetchProducts.rejected.type,
                error: expect.objectContaining({
                    message: mockError,
                }),
            })
        );
    });

    it("should add a new product to the cart", () => {
        const items = [];
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(items, product, 1);

        expect(updatedItems).toEqual([{ ...product, quantity: 1 }]);
    });

    it("should increment the quantity of an existing product in the cart", () => {
        const items = [{ id: 1, title: "Product 1", price: 10, quantity: 1 }];
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(items, product, 1);

        expect(updatedItems).toEqual([{ ...product, quantity: 2 }]);
    });

    it("should decrement the quantity of an existing product in the cart", () => {
        const items = [{ id: 1, title: "Product 1", price: 10, quantity: 2 }];
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(items, product, -1);

        expect(updatedItems).toEqual([{ ...product, quantity: 1 }]);
    });

    it("should empty the cart deleting the last product", () => {
        const items = [{ id: 1, title: "Product 1", price: 10, quantity: 1 }];
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(items, product, -1);

        expect(updatedItems).toEqual([]);
    });

    it("should increment the quantity of an existing product in the cart", () => {
        const items = [{ id: 1, title: "Product 1", price: 10, quantity: 1 }];
        const product = { id: 1, title: "Product 1", price: 10 };
        const updatedItems = updateItems(items, product, 4);

        expect(updatedItems).toEqual([{ ...product, quantity: 5 }]);
    });
});
