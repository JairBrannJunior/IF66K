import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaTrash } from 'react-icons/fa';

import '../styles/pages/myList.scss';
import { getAuth } from '@firebase/auth';

export default function MyList() {
    const [movies, setMovies] = useState([]);

	const auth = getAuth();
    const user = auth.currentUser;

	useEffect(() => {
		getMovies();
	}, []);

	function getMovies() {
		if (user) {
			fetch(`http://localhost:3001/${user.uid}`)
				.then(response => {
					return response.json();
				})
				.then(data => {
					setMovies(data);
				});
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
                        <div className="icon" onClick={() => removeMovie(movie['id'])}>
                            <FaTrash color="white"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}