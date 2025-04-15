import React from "react";
import logo from "../../assets/img/logoEcomm.jpg"
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LogTitle,
  LogOptions,
  LoginImg,
  LoginSignIn,
  LoginFieldset
} from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const handleValidation = () => {
    navigate("/home");
  }

  const handleRegister = () => {
    navigate("/register"); 
  }

  const handleGuest = () => {
    navigate("/home");
  }


  return (
    <>
      <LoginContainer>
        <LogOptions>
          <LoginImg></LoginImg>
          <LoginSignIn>
            <LogTitle>
              <img src={logo} alt="logo-store" />
              <h1>Welcome to <span>Mini Store</span></h1>
            </LogTitle>
            <LoginFieldset>
              <h2>Nice to see you again!</h2>
              <form>
                <label for="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                />
                <label for="password">Password:</label>
                <input
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Password123"
                />
              </form>
              <button onClick={handleValidation}>Login</button>
            </LoginFieldset>
            <p>Or......</p>
            <h2 className="notAcount">Don't you have an account?</h2>
            <button onClick={handleRegister}>Go to register!</button>
            <p>Or......</p>
            <button className="guest" onClick={handleGuest}>Continue as guest</button>
          </LoginSignIn>
        </LogOptions>
      </LoginContainer>
    </>
  );
};

export default Login;