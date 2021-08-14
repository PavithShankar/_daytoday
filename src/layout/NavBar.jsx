import React from 'react';
import PreloginNavBar from '../layout/PreloginNavBar';
import PostLoginUserNavbar from '../layout/PostLoginUserNavBar';

const NavBar = () => {
    debugger;

    let UserDetails = {};
    let UserAuth = false;


    UserDetails = JSON.parse(localStorage.getItem('UserDetails'));
    UserAuth = localStorage.getItem('UserAuth');

    let Navbardata = {
        'UserDetails': UserDetails,
        'UserAuth': UserAuth
    }
    //console.log("Navbardata", Navbardata);


    if (UserAuth) {
        if (UserDetails.data.User.firstname !== "") {
            return <PostLoginUserNavbar />
        }
        else {
            return <PreloginNavBar />
        }

    }
    else {
        return <PreloginNavBar />
    }

    // return (
    //     <PostLoginUserNavbar />
    // );
}

export default NavBar;