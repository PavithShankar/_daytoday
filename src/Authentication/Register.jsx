import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Config from '../Config.json';
import { useToasts } from 'react-toast-notifications';
import MainContext from '../context_/main/MainContext';

const Register = () => {

    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Image, setimage] = useState('');
    const [ImageValid, setImageValid] = useState('');
    const [ImageFilename, setimageFilename] = useState('');
    const { addToast } = useToasts('');
    const history = useHistory();
    const { setUser } = useContext(MainContext);



    useEffect(() => {

        setimage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")


    }, []);

    const clear = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setMobile('');
        setimage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        setImageValid('')
        setimageFilename('');
    }

    const ImageChange = (e) => {
        debugger;
        setImageValid(e.target.files[0]);
        setimage(URL.createObjectURL(e.target.files[0]));
        setimageFilename(e.target.files[0].name);

    };

    const Register_Submit = (e) => {
        e.preventDefault();
        debugger;
        let is_Valid = true;

        let Email_Regx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let Email_Valid = Email_Regx.test(Email);
        let Mobile_Regx = /^[1-9]{1}[1-9]{9}$/;
        let Mobile_Valid = Mobile_Regx.test(Mobile);
        let Password_regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6})");
        let Password_Valid = Password_regx.test(Password);

        if (Firstname === "") {
            addToast("Please Enter FirstName!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Lastname === "") {
            addToast("Please Enter LastName!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (!Email_Valid) {
            addToast("Please Enter Email!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Username === "") {
            addToast("Please Enter Username!", {
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
        else if (!Password_Valid) {
            addToast("Please provide a password with 6 characters which contain at least one numeric digit, one uppercase, one lowercase letter and one special character!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (ConfirmPassword === "") {
            addToast("Please Enter Confirm Password!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Password !== ConfirmPassword) {
            addToast("Password and Confirm password does not match!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (!Mobile_Valid) {
            addToast("Please Enter Valid Mobile Number!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (ImageValid === "") {
            addToast("Please Upload Profile Picture!", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else {

            let formdata = new FormData();
            formdata.append('firstname', Firstname);
            formdata.append('lastname', Lastname);
            formdata.append('email', Email);
            formdata.append('password', Password);
            formdata.append('username', Username);
            formdata.append('mobilenumber', Mobile);
            formdata.append('profileimage', ImageValid);

            axios.post(`${Config.BaseUrl}${Config.Register_Api}`, formdata)
                .then((response) => {
                    //console.log('Register_Data', response.data.data);
                    HandleUserData(response.data.data)
                    addToast("Registration Successfully Completed. We have sent a Verification link to your Mail-Id ", {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    clear();
                })
                .catch((error) => {
                    //console.log("Register_Error", error.response);
                    addToast("Your details are not saved properly, Please try again!", {
                        appearance: 'error',
                        autoDismiss: true
                    });
                });
        };
    }

    const HandleUserData = (data) => {
        //setUser(data.User_Details);
        history.push("/")
        //console.log('data', data);


    }


    return (
        <Fragment>
            <section className="vh-100 bg-image bkreg" >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card crdred" >
                                    <div className="card-body p-5 pb-3">
                                        <h2 className="text-uppercase Registerpage text-center mb-2">Create an account</h2>

                                        <form onSubmit={Register_Submit}>

                                            <div className="form-floating mb-3">

                                                <input className="form-control"
                                                    id="Firstname"
                                                    type="text"
                                                    //required
                                                    value={Firstname}
                                                    onChange={(e) => {
                                                        setFirstname(e.target.value);
                                                    }}
                                                    placeholder="Enter your Firstname..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">First name</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Firstname!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="lastname"
                                                    type="text"
                                                    //required
                                                    value={Lastname}
                                                    onChange={(e) => {
                                                        setLastname(e.target.value);
                                                    }}
                                                    placeholder="Enter your Lastname..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Last name</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Lastname!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="username"
                                                    type="text"
                                                    //required
                                                    value={Username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    placeholder="Enter your Username..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Username</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Username!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="email"
                                                    type="email"
                                                    //required
                                                    value={Email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                    placeholder="Enter your Email..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Email</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Email!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="password"
                                                    type="password"
                                                    //required
                                                    value={Password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    placeholder="Enter your Password..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Password</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Password!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="cpassword"
                                                    type="password"
                                                    //required
                                                    value={ConfirmPassword}
                                                    onChange={(e) => {
                                                        setConfirmPassword(e.target.value);
                                                    }}
                                                    placeholder="Enter your ConfirmPassword..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Confirm Password</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Confirm Password!</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="MobileNumber"
                                                    type="number"
                                                    //required
                                                    value={Mobile}
                                                    onChange={(e) => {
                                                        setMobile(e.target.value);
                                                    }}
                                                    minLength={10}
                                                    maxLength={10}
                                                    placeholder="Enter your Mobile..."
                                                    data-sb-validations="required" />
                                                <label htmlFor="name">Mobile Number</label>
                                                <div className="invalid-feedback" data-sb-feedback="name">Please Enter Mobile Number!</div>
                                            </div>
                                            <div className="form-outline mb-2 btn-silver text-center">
                                                <div className="p-2 bd-highlight">
                                                    <span>
                                                        <img
                                                            src={Image}
                                                            width="100"
                                                            height="100"
                                                            className="rounded-circle"
                                                        ></img>
                                                        {/* {userimg()} */}
                                                        <br />
                                                    </span>
                                                </div>
                                                <label>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        style={{ display: "none" }}
                                                        accept="image/png, image/jpeg"
                                                        onChange={ImageChange}
                                                    />

                                                    <span htmlFor="form3Exampleimgcdg" className="btn btn-primary mx-auto">
                                                        Profile Photo Upload
                                                    </span>
                                                </label>
                                                <br />
                                                <span>
                                                    <label>{ImageFilename}</label>
                                                </span>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-2">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3cg"
                                                />
                                                <label className="form-check-label" for="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}

                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-2 mb-0">Have already an account?
                                            <Link
                                                    className="fw-bold text-body"
                                                    to='/Login' >
                                                    <u>Login here</u>
                                                </Link>
                                            </p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </Fragment>


    );

};

export default Register;