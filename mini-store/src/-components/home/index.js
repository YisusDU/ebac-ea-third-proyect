import React from "react";
import ProductHeader from "./header/index.js";
import ProductsList from "./ProductsList/index.js"
import Cart from "./Cart/index.js"


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