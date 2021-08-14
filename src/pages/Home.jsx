import React from 'react';
import PreLogin from '../homecontent/PreLogin';
import PostloginUser from '../homecontent/PostloginUser';



const Home = () => {



    let UserDetails = {};
    let UserAuth = false;

    let checkuser_auth = localStorage.getItem('UserAuth');

    if (checkuser_auth) {
        UserAuth = true;
        UserDetails = JSON.parse(localStorage.getItem('UserDetails'));

    }

    let Home_user_data = {
        'UserDetails_': UserDetails,
        'UserAuth': UserAuth
    }

    //console.log('HomeData', Home_user_data);



    if (UserAuth) {
        if (UserDetails.data.User.firstname !== "") {
            return <PostloginUser />
        }
        else {
            return <PreLogin />
        }
    }
    else {
        return <PreLogin />
    }

};

export default Home;