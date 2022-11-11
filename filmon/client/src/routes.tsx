import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MyList from './pages/MyList';

function RoutePaths() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> }/>
                <Route path="/home" element={ <Home /> }/>
                <Route path="/register" element={ <Register /> }/>
                <Route path="/myList" element={ <MyList /> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePaths;