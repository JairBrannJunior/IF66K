import React, { useEffect, useState } from 'react';

import '../styles/pages/home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';

import { getAuth } from "firebase/auth";

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;

    const getApiMovies = async (search: string) => {
        const url = `https://www.omdbapi.com/?s=${search}&apikey=a0135b45`;

        const response = await fetch(url);
        const json = await response.json();

        if (json.Search)
            setMovies(json.Search);
    };

    useEffect(() => {
        getApiMovies(search);
    }, [search]);

    function addMovieToMyList(userId: any, movieId: string, movieName: string, movieImg: string) {
        if (userId) {
            fetch('http://localhost:3001/myListMovies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, movieId, movieName, movieImg}),
                })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    alert(data);
                });
        }
    }

    return (
        <div className="general-page">
            <Sidebar title={"Minha lista"}/>
            <div className="container-fluid movie-card">
                
                <div className=" d-flex align-items-center mt-4 mb-4">
                    <div className="col title">
                        <h1>Filmes</h1>
                    </div>
                    <div className="col col-sm-4">
                        <input value={search} onChange={(event) => setSearch(event.target.value)} className="form-control" placeholder="Digite para pesquisar..."></input>
                    </div>
                </div>
                <div className="row">
                    {movies.map((movie, index) => (
                        <div className="image-container d-flex justify-content-start m-3">
                            <img src={movie['Poster']} alt="movie"></img>
                            <div className="overlay d-flex align-items-center justify-content-center" onClick={() => addMovieToMyList(user?.uid, movie['imdbID'], movie['Title'], movie['Poster'])}>
                                <span className="mr-2">Adicionar a minha lista</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Home;