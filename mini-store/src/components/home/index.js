import React from "react";
import ProductHeader from "./header/index.js";
import ProductsList from "./productsList/index.js"
import Cart from "./cart/index.js"


const Home = () => {
    return (
        <>
            <ProductHeader />
            <ProductsList />
            <Cart />
        </>
    )
}

export default Home