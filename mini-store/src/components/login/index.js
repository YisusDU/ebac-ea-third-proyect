import React from "react";
import logo from "../../assets/img/logoEcomm.jpg"
import useAuth  from "../../hooks/useAuth";
import {
  LoginContainer,
  LogTitle,
  LogOptions,
  LoginImg,
  LoginSignIn,
  LoginFieldset
} from "./styles";

const Login = () => {
  const {
    emailValid,
    passwordValid,
    validateInput,
    handleValidation,
    handleRegister,
    handleGuest
  } = useAuth();

  return (
    
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
                  minLength={8}
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
    
  );
};

export default Login;