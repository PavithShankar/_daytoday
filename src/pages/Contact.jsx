import React, { Fragment, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import Config from '../Config.json';
import axios from "axios";



const Contect = () => {
    debugger

    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Message, setMessage] = useState('');

    const { addToast } = useToasts();

    const clear = () => {
        setFullName('');
        setEmail('');
        setMobile('');
        setMessage('');
    }


    const Contact_Submit = (e) => {
        e.preventDefault();
        debugger;
        let form_valid = true;
        debugger
        let Email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let Email_isvalid = Email_regex.test(Email);
        var ph = /^[1-9]{1}[1-9]{9}$/;
        var ph_data = ph.test(Mobile);


        if (FullName === "") {
            addToast("Please Enter the FullName", {
                appearance: "error",
                autoDismiss: true,
            });
            form_valid = false;
        }
        else if (!Email_isvalid) {
            addToast("Please Enter Valid Email", {
                appearance: 'error',
                autoDismiss: true
            });
            form_valid = false;

        }
        else if (!ph_data) {
            addToast('Please Enter 10digit Mobile Number',
                {
                    appearance: 'error',
                    autoDismiss: true
                });
            form_valid = false;

        }
        else if (Message.length > 2000) {
            addToast('Please Enter Maximum 2000 Characters For Message.', {
                appearance: 'error',
                autoDismiss: true
            });
            form_valid = false;
        }
        else {
            if (form_valid) {

                let formdata = new FormData();
                formdata.append('Name', FullName);
                formdata.append('Email', Email);
                formdata.append('PhoneNumber', Mobile);
                formdata.append('Message', Message);


                axios.post(`${Config.BaseUrl}${Config.Contact_Api}`, formdata)
                    .then((response) => {
                        debugger;
                        //console.log("Success", response.data);
                        addToast("Information SuccessFully Saved", {
                            appearance: 'success',
                            autoDismiss: true
                        });
                        clear();
                    })
                    .catch((err) => {
                        debugger;
                        //console.log("Error", err.response);
                        addToast("Your details are not saved properly, Please try again!", {
                            appearance: 'error',
                            autoDismiss: true
                        });
                    });


            };
        }


    }


    return (
        <Fragment>
            <section className="page-section contactcolor" id="contact">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6 text-center">
                            <h2 className="mt-0">Let's Get In Touch!</h2>
                            <hr className="divider" />
                            <p className="text-muted mb-5">Ready to start your daily log with us? Send us a messages and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form id="contactForm " onSubmit={Contact_Submit}>
                                {/* <!-- Name input--> */}
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        id="name"
                                        type="text"
                                        // required
                                        value={FullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }}
                                        placeholder="Enter your name..."
                                        data-sb-validations="required" />
                                    <label htmlFor="name">Full name</label>
                                    <div className="invalid-feedback" data-sb-feedback="name">Please Enter Fullname!</div>
                                </div>
                                {/* <!-- Email address input--> */}
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        id="email"
                                        type="email"
                                        // required
                                        value={Email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}

                                        placeholder="name@example.com"
                                        data-sb-validations="required" />
                                    <label htmlFor="email">Email address</label>
                                    <div className="invalid-feedback" data-sb-feedback="email">An email is required.</div>

                                </div>
                                {/* <!-- Phone number input--> */}
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        id="phone"
                                        type="number"
                                        // required
                                        value={Mobile}
                                        onChange={(e) => {
                                            setMobile(e.target.value)
                                        }}
                                        minLength={10}
                                        maxLength={10}
                                        placeholder="(123) 456-7890"
                                        data-sb-validations="required" />
                                    <label htmlFor="phone">Phone number</label>
                                    <div className="invalid-feedback" data-sb-feedback="phone">A phone number is required.</div>
                                </div>
                                {/* <!-- Message input--> */}
                                <div className="form-floating mb-3">
                                    <textarea className="form-control"
                                        id="message"
                                        type="text"
                                        value={Message}
                                        onChange={(e) => {

                                            setMessage(e.target.value);

                                        }}
                                        maxLength={2000}
                                        placeholder="Enter your message here..."
                                    ></textarea>
                                    <label htmlFor="message">Message</label>
                                    <div className="invalid-feedback" data-sb-feedback="message">A message is required.</div>
                                </div>
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                                {/* <!-- Submit Button--> */}
                                <div className="d-grid"><button className="btn btn-primary btn-xl" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-4 text-center mb-5 mb-lg-0">
                            <i className="bi-phone fs-2 mb-3 text-muted"></i>
                            <div>+91 7010455926</div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment >
    );
};

export default Contect;