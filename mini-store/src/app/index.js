import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import GlobalStyles from "../theme/GlobalStyles";
import Login from "../components/login";
import Registry from "../components/registry";
import Home from "../components/home";
import Checkout from "../components/checkout";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        {/* <Login /> */}
        {/* <Registry /> */}
        {/* <Home /> */}
        <Checkout />
        <Routes>
          <Route path="" element={<></>} />
          <Route path="" element={<></>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
