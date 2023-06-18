import React , {useState, useEffect} from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

import '../styles/application.css'

// import Info from './info';
// import Todos from './todos';
// import Posts from './posts';
// import Albums from './albums';

const Application = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogout = () => {
        localStorage.removeItem("user");
    }

    


    return (
        <>
            <div className="navbar">
                <div className="navbar__left">
                    <Link to={`/application/${user.name}/info`}>Info</Link>
                    <span className="navbar__separator"></span>
                    <Link to={`/application/${user.name}/todos`}>Todos</Link>
                    <span className="navbar__separator"></span>
                    <Link to={`/application/${user.name}/posts`}>Posts</Link>
                    <span className="navbar__separator"></span>
                    <Link to={`/application/${user.name}/albums`}>Albums</Link>
                </div>
                <div className="navbar__right">
                    <Link to='/login' onClick={handleLogout}>Logout</Link>
                </div>
            </div>
            <div className="welcome-container">
                <h1>hello {user.name} and welcome to our website</h1>
            </div>
            <Outlet />
        </>
    )
}

export default Application;