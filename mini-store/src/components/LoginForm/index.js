import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { FormContainer, Form, Title, Label } from "./styled";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ASYNC_STATUS } from "../../constants/asyncStatus";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
// Corregir en práctica, por ahora no funciona
    // dispatch(fetchUser({ email, password }))
    //   .unwrap()
    //   .then(() => {
    //     navigate("/");
    //   });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        {status === ASYNC_STATUS.REJECTED && <p>Error {error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
