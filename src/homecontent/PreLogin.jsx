import React from 'react';
import PostLoginUser from './PostloginUser';
import PreloginContent from './PreloginContent';


const PreLogin = () => {

    // let UserDetails = {};
    // let User_Auth = false;


    // UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    // User_Auth = localStorage.getItem("UserAuth");

    // if (User_Auth) {
    //     if (UserDetails.data.User.firstname !== "") {
    //         return <PostLoginUser />
    //     }
    //     else {
    //         return <PreLogin />
    //     }
    // }
    // else {
    //     return <PreLogin />
    // }

    return (
        <div>
            <PreloginContent />
        </div>
    );


}

export default PreLogin;