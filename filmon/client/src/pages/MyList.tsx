import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

import '../styles/pages/myList.scss';
import { useNavigate } from 'react-router-dom';

export default function MyList() {
    const [movies, setMovies] = useState([]);

    const logged = localStorage.getItem("logged");
    let user = localStorage.getItem("user") as any;
    user = user ? JSON.parse(user)[0] : user;
	const history = useNavigate();

	useEffect(() => {
		getMovies();
	}, []);

	function getMovies() {
		if (logged === '1') {
			fetch(`http://localhost:3001/${user.id}`)
				.then(response => {
					return response.json();
				})
				.then(data => {
					setMovies(data);
				});
		} else {
			alert('Usuário não logado!');
            history("/");
		}
	}

	function removeMovie(id: string) {
		fetch(`http://localhost:3001/myListMovies/${id}`, {
		  method: 'DELETE',
		})
		  .then(response => {
			return response.text();
		  })
		  .then(data => {
			alert(data);
			getMovies();
		  });
	  }

	function watchedMovie(id: any) {
        if (logged === '1') {
            fetch('http://localhost:3001/watchedMovie', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
                })
                .then(response => {
                    return response.text();
                })
                .then(data => {
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