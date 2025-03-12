import React from "react";
import logo from "../../assets/img/logoEcomm.jpg"
import {
  LoginContainer,
  LogTitle,
  LogOptions,
  LoginSignUp,
  LoginSignIn,
  LoginFieldset
} from "./styles";

const Login = () => {
  return (
    <>
      <LoginContainer>

        <LogOptions>
          <LoginSignUp>
          </LoginSignUp>
          <LoginSignIn>
            <LogTitle>
              <img src={logo}/>
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
              <button>Login</button>
            </LoginFieldset>
            <p>Or......</p>
            <h2>Don't you have an acount?</h2>
            <button>Go to register!</button>
          </LoginSignIn>
        </LogOptions>
      </LoginContainer>
    </>
  );
};

export default Login;