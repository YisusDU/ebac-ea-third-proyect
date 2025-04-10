import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import GlobalStyles from "../theme/GlobalStyles";
import Login from "../components/Login";
import Registry from "../components/Registry";
import Home from "../components/home";
import Checkout from "../components/checkout";
import PostCheckout from "../components/PostCheckout";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        {/* <Login /> */}
        {/* <Registry /> */}
        <Home />
       {/*  <Checkout /> */}
        {/* <PostCheckout /> */}
        <Routes>
          <Route path="" element={<></>} />
          <Route path="" element={<></>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
