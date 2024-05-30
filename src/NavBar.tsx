import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <NavLink to={"/"} className="navbarButtons matches-icon ({isActive}) => isActive ? 'navbarButtons active': 'navbarButtons'">Matches</NavLink>
                <NavLink to={"/predictions"} className="navbarButtons predictions-icon ({isActive}) => isActive ? 'navbarButtons active': 'navbarButtons'">Predictions</NavLink>
                <NavLink to={"/leagues"} className="navbarButtons league-icon ({isActive}) => isActive ? 'navbarButtons active': 'navbarButtons'">Leagues</NavLink>
                <NavLink to={"/store"} className="navbarButtons store-icon ({isActive}) => isActive ? 'navbarButtons active': 'navbarButtons'">Store</NavLink>
                <NavLink to={"/profile"} className="navbarButtons profile-icon ({isActive}) => isActive ? 'navbarButtons active': 'navbarButtons'">Profile</NavLink>
            </nav>
        </div>
    );
};

export default NavBar;