import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/sidebar.scss';


const Sidebar = (props: any) =>{
    const history = useNavigate();

    const redirect = async () => {
        if (props.title === "Página inicial")
            history("/home");
        else
            history("/myList");
    };

    return (
        <div className="sidebar">
            <div className="div-span" onClick={redirect}>
                <span className="span">{props.title}</span>
            </div>
        </div>
    );
}

export default Sidebar;