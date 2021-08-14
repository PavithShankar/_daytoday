import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Contact from '../pages/Contact';
import NavBar from '../layout/NavBar';
import Contect from '../pages/Contact';


const PreloginContent = () => {


    return (
        <div>
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">Here You can Log Your Daily Activity in Easy Way</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Let's Start With Fun </p>
                            <NavLink
                                exact to='/about'>
                                <button className="btn btn-primary btn-xl">Find Out More</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
            <section className="page-section" id="services">
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">At Your Service</h2>
                    <hr className="divider" />
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Sturdy Website</h3>
                                <p className="text-muted mb-0">Our Website are updated regularly to keep them bug free!</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Up to Date</h3>
                                <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Ready to Log</h3>
                                <p className="text-muted mb-0">You can use log your status, and you can make changes!</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Made with Love</h3>
                                <p className="text-muted mb-0">Is it really easy to use and we made with love</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Contect />
        </div>

    );
};

export default PreloginContent;