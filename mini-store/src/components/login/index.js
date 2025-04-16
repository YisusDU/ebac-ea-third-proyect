import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyLogin } from "../../state/products.slice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const registeredUser = useSelector((state) => state.cart.user);

  const validateInput = (e) => {
    if (!registeredUser) return;

    const { name, value } = e.target;
    if (name === 'email') {
      setEmailValid(value === registeredUser.email);
    } else if (name === 'password') {
      setPasswordValid(value === registeredUser.password);
    }
  }

  const handleValidation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!registeredUser) {
      setEmailValid(false);
      setPasswordValid(false);
      alert('No registered users found. Please register first.');
      return;
    }

    if (email === registeredUser.email && password === registeredUser.password) {
      setEmailValid(true);
      setPasswordValid(true);
      alert('Login successful!');
      dispatch(verifyLogin(true));
      navigate("/home");
    } else {
      setEmailValid(email === registeredUser.email);
      setPasswordValid(password === registeredUser.password);
      alert('Invalid email or password');
    }
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
          <LoginImg />
          <LoginSignIn>
            <LogTitle>
              <img src={logo} alt="logo-store" />
              <h1>Welcome to <span>Mini Store</span></h1>
            </LogTitle>
            <LoginFieldset>
              <h2>Nice to see you again!</h2>
              <form onSubmit={handleValidation}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className={emailValid === null ? '' : emailValid ? 'valid' : 'invalid'}
                  onBlur={validateInput}
                />
                <span className={emailValid === false ? "error-message" : "message-space"}>
                  {emailValid === false && "Incorrect Email"}
                </span>
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Password123"
                  required
                  className={passwordValid === null ? '' : passwordValid ? 'valid' : 'invalid'}
                  onBlur={validateInput}
                />
                <span className={passwordValid === false ? "error-message" : "message-space"}>
                  {passwordValid === false && "Incorrect Password"}
                </span>
                <button type="submit">Login</button>
              </form>
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