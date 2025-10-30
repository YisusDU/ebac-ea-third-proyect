import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/slices/userSlice";
import { FormContaier, Form, Title, Label } from "./styled";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match ");
      return;
    }

    dispatch(createUser({ email, user, password }));
    navigate("/");
  };

  return (
    <FormContaier>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Label>User</Label>
        <Input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
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
        <Label>confirm Password</Label>
        <Input
          type="pasword"
          value={password}
          onChange={(e) => SetConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
        {status === ASYNC_STATUS.REJECTED && <p>Error: {error}</p>}
        <p>
          Already have an account? <Link to="/login"> Login</Link>
        </p>
      </Form>
    </FormContaier>
  );
};

export default RegisterForm;
