import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to="/" className="navbar-brand" >Burritos Los Inges</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/ventas" className="nav-link">Ventas</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/gastos" className="nav-link">Gastos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pendientes" className="nav-link">Pendientes</Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
};

export default NavBar;