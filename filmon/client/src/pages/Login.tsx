import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../functions/login';
import jwt_decode from "jwt-decode";

import '../styles/global.scss';

import image from '../assets/logo.png'

function Login() {
    document.title = "Login FilmON";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        const response = await login(email, password);

        if (response.status !== 200)
            return window.alert("Usuário ou senha incorretos, tente novamente.");

        let token = await response.json();
        token = token.token;
        const decodedData = jwt_decode(token) as any;

        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify({ userId: decodedData.id, userName: decodedData.name }));
        history("/home");
    };

    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <div className="nameLogo">
                        <img src={image} alt="FilmON" />
                    </div>
                    <div className="login__container__input">
                        <input type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Digite sua Senha" onChange={(e) => setPassword(e.target.value)} />

                        <button id="login-button" onClick={handleLogin}>Fazer login</button>

                        <div className="login__container__registro">
                            <Link to="/register">Não tem uma conta? Cadastre-se</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;