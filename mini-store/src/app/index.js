import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import Login from "../components/Login";
import Registry from "../components/Registry";
import Home from "../components/home";
import Checkout from "../components/checkout";
import PostCheckout from "../components/PostCheckout";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/postcheckout" element={<PostCheckout />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
