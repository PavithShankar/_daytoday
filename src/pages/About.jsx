import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';


const About = () => {


    return (
        <Fragment>
            <div>
                <section className="page-sectionAbout bg-primary">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white mt-0">We are easy to log your daily activity</h2>
                                <hr className="divider divider-light" />
                                <p className="text-white-75 mb-4">Here You can Quickly and easily store Specific tasks and information that you do on a daily basis </p>
                                <NavLink exact to="/register">
                                    <button className="btn btn-light btn-xl">Get Started!</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Fragment >
    )
}

export default About;