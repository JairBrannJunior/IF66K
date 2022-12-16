import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import '../styles/global.scss';
import '../styles/pages/movieDetail.scss';

function MovieDetail() {
    const [comment, setComment] = useState('');
    const [movieComments, setMovieComments] = useState([]);

    const token = localStorage.getItem("token");
    let userData = localStorage.getItem("userData") as any;
    userData = userData ? JSON.parse(userData) : '';

    const { state } = useLocation();
    let movie = state ? state.movie : {Title: '', Poster: '', imdbID: ''};
    const history = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('Usuário não logado!');
            history("/");
            return;
        }

        if (!state)
            history("/home");

        getMovieComments();
    }, []);

	function getMovieComments() {
        if (token) {
            fetch(`http://localhost:3001/getMovieComments/${movie.imdbID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 401)
                    return response.status.toString();
                else
                    return response.json();
            })
            .then(data => {
                if (data === '401') {
                    alert('Usuário não logado!');
                    history("/");
                } else
                    setMovieComments(data);
            });
        } else {
            alert('Usuário não logado!');
            history("/");
        }
	}

    function saveComment(userId: any, movieId: string) {
        if (token) {
            const userName = userData.userName;
            fetch('http://localhost:3001/saveComment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, movieId, comment, userName}),
                })
                .then(response => {
                    if (response.status === 401)
                        return response.status.toString();
                    else
                        return response.text();
                })
                .then(data => {
                    if (data === '401') {
                        alert('Usuário não logado!');
                        history("/");
                    } else {
                        setComment('');
                        getMovieComments();
                        alert(data);
                    }
                });
        } else {
            alert('Usuário não logado!');
            history("/");
        }
    }

    return (
        <div className="d-flex flex-row">
            <Sidebar title={"Página inicial"}/>
            
            <div className="d-flex flex-column align-items-center justify-content-center div-general">
                <h1>{movie.Title}</h1>
                <div>
                    <img src={movie.Poster} alt="movie"></img>
                </div>

                <span className="span-comment">Comentários</span>
                <div className="d-flex flex-column input-comment">
                    <div className="d-flex flex-row justify-content-between">
                        <input id="comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <button className="button-comment" onClick={() => saveComment(userData.userId, movie.imdbID)}>Comentar</button>
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-center">
                    <div className="d-flex flex-row">
                        <span className="user-title">Usuário</span>
                        <span className="comment-title">Comentário</span>
                    </div>
                    {movieComments.map((movieComment, index) => (
                        <div className="d-flex flex-row div-comments">
                            <span className="user-space">{movieComment['user_name']}</span>
                            <span className="comment-space">{movieComment['comment']}</span>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;