import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

import '../styles/pages/myList.scss';
import { useNavigate } from 'react-router-dom';

export default function MyList() {
    const [movies, setMovies] = useState([]);

    const token = localStorage.getItem("token");
    let userData = localStorage.getItem("userData") as any;
    userData = userData ? JSON.parse(userData) : '';
	const history = useNavigate();

	useEffect(() => {
		getMovies();
	}, []);

	function getMovies() {
		if (token) {
			fetch(`http://localhost:3001/${userData.userId}`, {
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
						setMovies(data);
				});
		} else {
			alert('Usuário não logado!');
            history("/");
		}
	}

	function removeMovie(id: string) {
		if (token) {
			fetch(`http://localhost:3001/myListMovies/${id}`, {
				method: 'DELETE',
				headers: {
				  'Authorization': `Bearer ${token}`
				}
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
						alert(data);
						getMovies();
					}	
				});
		} else {
			alert('Usuário não logado!');
            history("/");
		}
	}

	function watchedMovie(id: any) {
        if (token) {
            fetch('http://localhost:3001/watchedMovie', {
                method: 'PUT',
                headers: {
					'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
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
                    } else
						getMovies();
                });
        }
    }

    return (
        <div className="general">
            <Sidebar title={"Página inicial"}/>
            
            <div className="data">
                <div className="d-flex justify-content-center">
                    <h1>Minha Lista</h1>
                </div>
                {movies.map((movie, index) => (
                    <div className="div-movie">
                        <img src={movie['movie_img']} alt="movie" width="50" height="50" className="img"></img>
						<span className="title">{movie['movie_name']}</span>
						<div className="div-watched">
							{
								movie['watched'] ?
								<span>(Já assistido!)</span>
								:
								<></>
							}
						</div>

						<div className="d-flex flex-row">
							{
								movie['watched'] ?
								<div className="icon" onClick={() => watchedMovie(movie['id'])}>
									<FaEyeSlash color="white"/>
								</div>
								:
								<div className="icon" onClick={() => watchedMovie(movie['id'])}>
									<FaEye color="white"/>
								</div>
							}
							
							<div role="delete" className="icon" onClick={() => removeMovie(movie['id'])}>
								<FaTrash color="white"/>
							</div>
						</div>
                    </div>
                ))}
            </div>
        </div>
    );
}