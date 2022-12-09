import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/global.scss';

import image from '../assets/logo.png'
import { register } from '../functions/register';

function Register() {
    document.title = "Cadastro FilmON";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useNavigate();

    const Registrar = async () => {
        const data = await register(email, password, name);
        alert(data);
        history("/");
    };

    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <div className="nameLogo">
                        <img src={image} alt="FilmON" />
                        <h2>Faça seu cadastro</h2>
                     </div>
                    <div className="login__container__input">
                        <input type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={Registrar}>Fazer cadastro</button>

                        <div className="login__container__registro">
                        <Link to="/">Já tem uma conta? Faça Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;