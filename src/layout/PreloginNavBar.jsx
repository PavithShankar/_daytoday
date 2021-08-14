import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';



const PreLoginNavBar = () => {
    return (
        <Fragment>
            <div>
                <ul className="navbar-nav ms-auto my-2 my-lg-0">
                    <li className="nav-item">
                        <NavLink
                            exact to='/'
                            className="nav-link"
                            activeClassName='nav-link active'>
                            Home
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            exact to='/about'
                            className='nav-link'
                            activeClassName='nav-link active'>
                            About

                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink exact to='/register'
                            className='nav-link'
                            activeClassName='nav-link active'>
                            Sign up
                        </NavLink>
                    </li>
                    <li className='nav-item' >
                        <NavLink
                            exact to='/login'
                            className='nav-link'
                            activeClassName='nav-link active'>
                            Login
                        </NavLink>

                    </li>
                    <li className='nav-item'>
                        <NavLink
                            exact to="/contact"
                            className="nav-link"
                            activeClassName='nav-link active'>
                            Contect
                            </NavLink>
                    </li>
                </ul>
            </div >
        </Fragment >
    );
};

export default PreLoginNavBar;