import React, { useContext } from 'react';
import Navbar from '../layout/NavBar';
import { NavLink } from 'react-router-dom';
import MainContext from '../context_/main/MainContext';


const Header = () => {

    const { user, isAuthenticated } = useContext(MainContext);

    let UserData = user;


    if (UserData !== '') {
        localStorage.clear();
        localStorage.setItem('UserDetails', JSON.stringify(UserData));
        localStorage.setItem('UserAuth', isAuthenticated)
    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <NavLink
                        exact to='/'>
                        <ul className="navbar-brand ">Day To Day</ul>
                    </NavLink>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <Navbar />
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};


export default Header;