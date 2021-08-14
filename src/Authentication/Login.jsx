import React, { Fragment, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MainContext from '../context_/main/MainContext';
import Config from '../Config.json';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
//import '../index.css';


const Login = () => {
    debugger;

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const { setUser } = useContext(MainContext);
    const { addToast } = useToasts();
    const history = useHistory();

    const Clear = () => {
        setEmail('');
        setPassword('');
    }

    const Login_Sumbit = (e) => {
        e.preventDefault();

        let is_Valid = true;

        let Email_Regx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let Email_Valid = Email_Regx.test(Email);

        if (!Email) {
            addToast("Please Enter Valid Email!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Password === "") {
            addToast("Please Enter Password!", {
                appearance: 'error',
                autoDismiss: true
            });

        }
        else {

            let formdata = new FormData();
            formdata.append('email', Email);
            formdata.append('password', Password);

            axios.post(`${Config.BaseUrl}${Config.Login_Api}`, formdata)
                .then((response) => {
                    //console.log('Login_Success_Data', response.data);
                    addToast("Login Successfully Completed", {
                        appearance: 'success',
                        autoDismiss: true

                    });
                    Clear()
                    HandleResponse(response.data);

                })
                .catch((error) => {
                    addToast("Something went wrong please try again later", {
                        appearance: 'error',
                        autoDismiss: true
                    });
                    //console.log("Login_Error_Response", error.response);
                })
        }

    }

    const HandleResponse = (data) => {

        setUser(data);

        //console.log('LoginData', data);
        history.push({
            pathname: "/",
            state: {
                data1: data
            }
        });

    }

    return (
        <Fragment>

            <section className="vh-100 Loginfullpage">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={Login_Sumbit}>
                                <div className="card crdred" >
                                    <div className="card-body p-5 pb-3">
                                        <h2 className="text-uppercase Registerpage text-center mb-2">Login</h2>

                                        {/* <!-- Email input --> */}
                                        <div className="form-floating mb-3">
                                            <input className="form-control"
                                                id="name"
                                                type="text"
                                                //required
                                                value={Email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                placeholder="Enter your Email!"
                                                data-sb-validations="required" />
                                            <label htmlFor="name">Email</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Email!</div>
                                        </div>
                                        {/* <!-- Password input --> */}
                                        <div className="form-floating mb-3">
                                            <input className="form-control"
                                                id="name"
                                                type="password"
                                                //required
                                                value={Password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                placeholder="Enter your Password..."
                                                data-sb-validations="required" />
                                            <label htmlFor="name"> Password</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Password!</div>
                                        </div>

                                        <div className="d-flex justify-content-around align-items-center mb-4">
                                            {/* <!-- Checkbox --> */}
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="form1Example3"
                                                />
                                                <label className="form-check-label" for="form1Example3"> Remember me </label>
                                            </div>
                                            {/* <button className=' btn btn-info  btn-lg btn-block '>Forgot password?</button> */}
                                        </div>
                                        {/* <!-- Submit button --> */}
                                        <div className='text-center'>
                                            <button type="submit" className="btn btn-info align-items-center btn-lg btn-block">Sign in</button>

                                        </div>

                                        <div className="divider d-flex align-items-center my-4">
                                            <p className="text-center text-muted mt-2 mb-0">Dont't have an account?
                                            <Link
                                                    className="fw-bold text-body"
                                                    to='/register' >
                                                    <u>Register here</u>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment >
    );

};

export default Login;