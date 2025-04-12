import React from "react";
import logo from '../../assets/img/logoEcomm.jpg'
import {
    RegistryForm,
    RegistryImg,
    RegistryContainer,
    RegistryLogo,
    RegistryOptions
} from "./styles.js";

const Registry = () => {
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
                        <form>
                            <label for="name">Name:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name and Last Name"
                            />
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
                            <label for="password2"> Confirm your Password:</label>
                            <input
                                id="password2"
                                type="text"
                                name="password2"
                                placeholder="Password123"
                            />
                            <button>Register</button>
                        </form>
                        <label className="sign__in" for="signIn">Already have and account?</label>
                        <button id="signIn" name="signIn">Go to Sign In</button>
                    </RegistryForm>
                    <RegistryImg></RegistryImg>
                </RegistryOptions>
            </RegistryContainer>
        </>
    )
}

export default Registry;