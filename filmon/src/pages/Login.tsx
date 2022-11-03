import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../config/firebase';
import { auth } from '../config/firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';

import '../styles/global.scss';

function Login() {
    document.title = "Login FilmON";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            history("/home");
        } catch {
            window.alert("Usuário ou senha incorretos, tente novamente.");
        }
    };


    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <div className="nameLogo">
                        <h1>FilmON</h1>
                        <h2>Fazer Login</h2>
                     </div>
                    <div className="login__container__input">
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                        
                        <button onClick={login}>Entrar</button>

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