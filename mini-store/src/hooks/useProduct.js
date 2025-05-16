import { useEffect, useMemo } from 'react';
import { fetchProducts, addProduct } from '../state/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IDLE  } from '../state/status.js';



const useProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart?.stock || []);
    const status = useSelector((state) => state.cart?.status || IDLE);
    const searchTerm = useSelector((state) => state.cart?.searchTerm || '');

    // We use useEffect to handle asynchronous operations
    useEffect(() => {
        status === IDLE && dispatch(fetchProducts())
    }, [dispatch, status]);

    // Handle the action of adding to the cart
    const handleAddToCart = (product) => {
        dispatch(addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        }));
    };
    // Filter the products based on the search term
    const filteredProducts = useMemo(() => {
        return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    // Organize the products into categories
    const categorizedProducts = useMemo(() => {

        return filteredProducts.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    }, [filteredProducts]);

    return {
        products: filteredProducts,
        categorizedProducts,
        status,
        searchTerm,
        handleAddToCart
    };
};

export default useProduct;