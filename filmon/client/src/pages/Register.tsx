import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../config/firebase';
import { auth } from '../config/firebase';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import '../styles/global.scss';

import image from '../assets/logo.png'

function Register() {
    document.title = "Cadastro FilmON";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const history = useNavigate();

    const Registrar = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            updateProfile(auth.currentUser!, {
                displayName: displayName
              });

            history("/");
        } catch {
            window.alert("Não foi possível criar uma conta.");
        }
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
                        <input type="text" placeholder="Digite seu nome" onChange={(e) => setDisplayName(e.target.value)}/>
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