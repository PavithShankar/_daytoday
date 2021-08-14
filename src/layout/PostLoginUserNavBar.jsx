import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import MainContext from '../context_/main/MainContext';
import sas from '../context_/main/MainContext';
import axios from 'axios';
import Config from '../Config.json';
import { useToasts } from 'react-toast-notifications';


const PostLoginUserNavbar = () => {

    const { setLogout, user } = useContext(MainContext);
    //const tmpUser = user;
    let UserDetails = {};
    // if (tmpUser) {
    //     UserDetails = JSON.parse(tmpUser);
    // } else {
    //     UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    // }
    UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    const history = useHistory();
    let Username = UserDetails.data.User.username;
    let Defaultimage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    let UserImage = UserDetails.data.User.profileimage;
    const AccessToken = UserDetails.data.token.Access;
    const RefreshToken = UserDetails.data.token.Refresh;

    let logout = {
        "AccessToken": AccessToken,
        "RefreshToken": RefreshToken
    }

    //console.log("logout_data", logout);

    const { addToast } = useToasts('');

    const Logout_Data = (e) => {
        debugger;
        e.preventDefault();

        const header = {
            headers: {
                Authorization: `Bearer ${AccessToken}`
            }
        }
        let data = {
            'refresh': RefreshToken
        }
        axios.post(`${Config.BaseUrl}${Config.Logout_Api}`, data, header)
            .then((response) => {
                debugger;

                localStorage.setItem("UserAuth", "false");
                addToast("Logout Successfully", {
                    appearance: 'success',
                    autoDismiss: true
                });
                localStorage.clear();
                setLogout();
                history.push('/');
            })
            .catch((error) => {
                //console.log("Logout_Error_Response", error.response);
                addToast("Something went wrong please try again later", {
                    appearance: 'error',
                    autoDismiss: true
                });
            })

    }


    const userimage = () => {

        if (UserDetails.data.User.profileimage === "") {
            return (
                <img
                    src={Defaultimage}
                    class="rounded-circle"
                    height="25"
                    alt=""
                    loading="lazy"
                />

            );
        }
        else {
            return (
                <img
                    src={UserImage}
                    class="rounded-circle"
                    height="25"
                    alt=""
                    loading="lazy"
                />
            )
        }

    }

    return (
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
                        exact to='/'
                        className='nav-link'
                        activeClassName='nav-link active'>
                        About

                        </NavLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {userimage()}&nbsp;{Username}&nbsp;&nbsp;</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            exact to='/'
                            className="nav-link"
                            activeClassName='nav-link active'>
                            Update Profile
                        </NavLink>

                        <div className=' divider'>
                            <button
                                onClick={Logout_Data}
                                className="btn btn-info align-items-center btn-block"
                            >
                                Logout
                        </button>
                        </div>
                    </div>

                </li>
            </ul>

        </div>
    );
};

export default PostLoginUserNavbar;
