import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) =>
        alert(error.message));
    };
    return <LoginContainer>
        <LoginInnerContainer>
            <img 
                src="https://i.postimg.cc/fLLPJkNp/
                93088315c8da46f99b422742cf178317.png"
                alt="Logo"
            />
            <h1>Sign in to CH4TTER!</h1>
            <p>ch4tter.com</p>

            <Button onClick={signIn}>Sign in with Google</Button>
        </LoginInnerContainer>

    </LoginContainer>;
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    
    >img {
        object-fit: contain;
        height: 200px;
        margin-bottom: 40px;
    }

    >button {
        margin-top: 50px;
        text-transform: inherit !important;
        color: white;
        background-color: #115094 !important;
    }

`;
