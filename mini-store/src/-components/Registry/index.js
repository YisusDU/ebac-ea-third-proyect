import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logoEcomm.jpg'
import {
    RegistryForm,
    RegistryImg,
    RegistryContainer,
    RegistryLogo,
    RegistryOptions
} from "./styles.js";
import { addUser } from "../../state/products.slice.js";

const Registry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const password2 = formData.get('password2');

        // Validación manual de campos vacíos
        if (!name || !email || !password || !password2) {
            alert('All fields are required');
            return;
        }

        // Validación de coincidencia de contraseñas
        if (password !== password2) {
            alert('Passwords do not match');
            return;
        }

        try {
            dispatch(addUser({
                name,
                email,
                password,
            }));

            alert('User added successfully');
            navigate('/');

        } catch (error) {
            alert('Error adding user');
            console.error(error);
        }
    }

    const handleLogin = () => {
        navigate('/');
    }

    return (
        <>
            <RegistryContainer>
                <RegistryOptions>
                    <RegistryForm>
                        <RegistryLogo>
                            <img src={logo} alt="logo-ecommerce" />
                            <span>Mini Store</span>
                        </RegistryLogo>
                        <h1>Registry</h1>
                        <form onSubmit={handleAddUser}>
                            <label for="name">Name:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name and Last Name"
                                required
                            />
                            <label for="email">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                            />
                            <label for="password">Password:</label>
                            <input
                                id="password"
                                type="text"
                                name="password"
                                placeholder="Password123"
                                minLength={8}
                                required
                            />
                            <label for="password2"> Confirm your Password:</label>
                            <input
                                id="password2"
                                type="text"
                                name="password2"
                                placeholder="Password123"
                                minLength={8}
                                required
                            />
                            <button type="submit">Register</button>
                        </form>
                        <label className="sign__in" for="signIn">Already have and account?</label>
                        <button id="signIn" name="signIn" onClick={handleLogin}>Go to Sign In</button>
                    </RegistryForm>
                    <RegistryImg></RegistryImg>
                </RegistryOptions>
            </RegistryContainer>
        </>
    )
}

export default Registry;