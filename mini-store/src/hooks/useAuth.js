import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyLogin } from "../state/products.slice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
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

    return {
        emailValid,
        passwordValid,
        validateInput, 
        handleValidation,
        handleRegister,
        handleGuest
    };
};
export default useAuth;


