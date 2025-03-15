import React from "react";
import ProductHeader from "../components/header/index";
import ProductsList from "../components/productsList/index"
import Cart from "../components/cart/index"
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import GlobalStyles from "../theme/GlobalStyles";
import Login from "../components/login";
import Registry from "../components/registry";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        {/* <Login /> */}
        <Registry />
        <Routes>
          <Route path="" element={<></>} />
          <Route path="" element={<></>} />
        </Routes>
        {/* <ProductHeader />
      <ProductsList />
      <Cart /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
