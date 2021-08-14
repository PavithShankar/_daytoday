import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Config from '../Config.json';
import ProjectGrid from '../ProjectContent/Project_Body'


const PostLoginUser = () => {

    let UserDetails = {};
    let UserAuth = true;

    UserDetails = JSON.parse(localStorage.getItem("UserDetails"));

    // console.log("Userdetails:", UserDetails.data.token.Access);

    let Token = UserDetails.data.token.Access;
    //let Token = 'sas';

    const [lgShow, setLgShow] = useState(false);
    const { addToast } = useToasts('');
    const [ProjectName, SetProjectName] = useState('');
    const [TaskName, SetTaskName] = useState('');
    const [Hours, setHours] = useState('');
    const [Notes, SetNotes] = useState('');
    const [Billtype, SetBilltype] = useState([{ value: 0, label: 'Select Billtype' }]);
    const [Progresstype, SetProgresstype] = useState([{ value: 0, label: 'Select Status' }]);
    const [Startdate, SetStartdate] = useState(new Date());
    const [Enddate, SetEnddate] = useState(new Date());
    const BillStatus = [
        { value: 0, label: 'Select Billtype' },
        { value: 1, label: 'Billable' },
        { value: 2, label: 'Non Billable' }
    ];
    const ProgressStatus = [
        { value: 0, label: 'Select Status' },
        { value: 1, label: 'In Progress' },
        { value: 2, label: 'Completed' }
    ];

    const handlebilltype = (btype) => {
        let billtype = [];

        billtype.push(btype);

        SetBilltype(billtype);

    }
    const handleProgresstype = (ptype) => {
        let progresstype = [];

        progresstype.push(ptype);

        SetProgresstype(progresstype);

    }

    const Clear = () => {
        SetTaskName('');
        setHours('');
        setLgShow(false);
        SetBilltype([{ value: 0, label: 'Select Billtype' }]);
        SetProgresstype([{ value: 0, label: 'Select Status' }]);
        SetNotes('');
        SetStartdate(new Date());
        SetEnddate(new Date());
    }

    const Project_Submit = (e) => {
        debugger;
        e.preventDefault();
        let startdate = moment(Startdate).format("YYYY-MM-DD HH:mm:ss");
        let enddate = moment(Enddate).format("YYYY-MM-DD HH:mm:ss")
        let stdate = Startdate.getTime();
        // console.log("Billtype", Billtype[0].label);
        // console.log("progresstype", Progresstype[0].label);
        // console.log("stdate", stdate);
        let Hours_regx = /^(([0-9])|([0-1][0-9])|([2][0-3]))(:(([0-9])|([0-5][0-9])))?$/;
        let Hours_valid = Hours_regx.test(Hours);

        let Bill_Type = Billtype.map((i) => {
            return i.value;
        });
        let Progress_Type = Progresstype.map((i) => {
            return i.value;
        });
        let Bill_label = Billtype.map((i) => {
            return i.label;
        });
        let Progress_label = Progresstype.map((i) => {
            return i.label;
        });

        let Bill_type_Value = Bill_Type[0];
        let Status_type_Value = Progress_Type[0];
        let Bill_type_Label = Bill_label[0];
        let Status_type_Label = Progress_label[0];


        let is_valid = true;
        if (ProjectName === "") {
            addToast("Please Enter Project Name", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (TaskName === "") {
            addToast("please Enter Task Name", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (!Hours_valid) {
            addToast("Please Enter Your log hours within 24Hrs", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Notes === "") {
            addToast("Please Enter Log Notes", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (Bill_type_Value === 0) {
            addToast("Please Select BillType", {
                appearance: 'error',
                autoDismiss: true
            });

        }
        else if (Status_type_Value === 0) {
            addToast("Please Select Status", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else {


            let formdata = new FormData();
            formdata.append('projectname', ProjectName);
            formdata.append('taskname', TaskName);
            formdata.append('hours', Hours);
            formdata.append('notes', Notes);
            formdata.append('billtype', Bill_type_Label);
            formdata.append('status', Status_type_Label);
            formdata.append('start_date', startdate);
            formdata.append('end_date', enddate);

            const header = {
                headers:
                {
                    Authorization: `Bearer ${Token}`
                }
            }
            let data = {
                'projectname': ProjectName,
                'taskname': TaskName,
                'hours': Hours,
                'notes': Notes,
                'billtype': Bill_type_Label,
                'status': Status_type_Label,
                'start_date': startdate,
                'end_date': enddate

            }

            // console.log("header", header);
            // console.log("formdata", data);

            axios.post(`${Config.BaseUrl}${Config.Project_Add_Api}`, data, header)
                .then((response) => {
                    //console.log("Project_Success_Response", response.data);
                    addToast("Log Added Successfully", {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    Clear();

                })
                .catch((error) => {
                    // console.log("Project_Error_response", error.response);
                    addToast("Something went wrong please try again later",
                        {
                            appearance: 'error',
                            autoDismiss: true
                        });
                    Clear();
                });

        }

    }


    return (
        <Fragment>
            <section className="page-section fullpage">
                <div className="container py-5 h-100">

                    <div className="card crdred" >
                        <div className="card-body ">
                            <h2 className="Registerpage text-center mb-2">Add your log here!</h2>
                            <br />
                            <div className='text-center' >
                                <Button type="submit" onClick={() => setLgShow(true)}>Add Log</Button>
                            </div>

                            <Modal
                                size="lg"
                                show={lgShow}
                                onHide={() => setLgShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Add Log
                                        </Modal.Title>
                                </Modal.Header >
                                <Modal.Body>
                                    <form onSubmit={Project_Submit}>
                                        <div className="form-floating mb-2">
                                            <input className="form-control"
                                                id="projectname"
                                                type="text"
                                                required
                                                value={ProjectName}
                                                onChange={(e) => {
                                                    SetProjectName(e.target.value);
                                                }}
                                                placeholder="Enter your Project Name !"
                                                data-sb-validations="required" />
                                            <label htmlFor="name">Project Name</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Project Name !</div>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <input className="form-control"
                                                id="taskname"
                                                type="text"
                                                required
                                                value={TaskName}
                                                onChange={(e) => {
                                                    SetTaskName(e.target.value);
                                                }}
                                                placeholder="Enter your Task Name !"
                                                data-sb-validations="required" />
                                            <label htmlFor="name">Task Name</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Task Name !</div>
                                        </div>

                                        <div className="form-floating mb-2">
                                            <Select
                                                components={{
                                                    IndicatorSeparator: () => null,
                                                    DropdownIndicator: () => null
                                                }}
                                                value={Billtype}
                                                onChange={handlebilltype}
                                                options={BillStatus}
                                                id="billtype"
                                            />

                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter BillType !</div>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <input className="form-control"
                                                id="hours"
                                                type="number"
                                                required
                                                value={Hours}
                                                onChange={(e) => {
                                                    setHours(e.target.value);
                                                }}
                                                placeholder="Enter your Hours !"
                                                data-sb-validations="required" />
                                            <label htmlFor="name">Hours</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Hours !</div>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <Select
                                                components={{
                                                    IndicatorSeparator: () => null,
                                                    DropdownIndicator: () => null
                                                }}
                                                value={Progresstype}
                                                onChange={handleProgresstype}
                                                options={ProgressStatus}
                                            />
                                        </div>
                                        <div className='row col-12'>

                                            <div className="form-floating mb-2 col-6">
                                                StartDate:
                                                     <DatePicker
                                                    selected={Startdate}
                                                    onChange={(date) => {
                                                        SetStartdate(date);
                                                    }}
                                                    readOnly={true}
                                                    timeIntervals={15}
                                                    showTimeSelect
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                />
                                            </div>
                                            <div className="form-floating mb-2 col-6">
                                                EndDate:
                                                    <DatePicker
                                                    selected={Enddate}
                                                    onChange={(date) => {
                                                        SetEnddate(date);
                                                    }}
                                                    readOnly={true}
                                                    timeIntervals={15}
                                                    showTimeSelect
                                                    dateFormat="MMMM d, yyyy h:mm aa"

                                                />

                                            </div>

                                        </div>
                                        <div className="form-floating mb-2">
                                            <textarea className="form-control"
                                                id="notes"
                                                type="text"
                                                required
                                                value={Notes}
                                                onChange={(e) => {
                                                    SetNotes(e.target.value);
                                                }}
                                                placeholder="Enter your Notes!"
                                                data-sb-validations="required" />
                                            <label htmlFor="name">Notes</label>
                                            <div className="invalid-feedback" data-sb-feedback="name">Please Enter Notes!</div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-info align-items-center btn-lg btn-block">Submit</button>
                                        </div>

                                    </form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="Proj d-flex align-items-center justify-content-center contproj h-100">
                    <div class="container">
                        <div>
                            <ProjectGrid
                                udetails={UserDetails} />
                        </div>
                    </div>
                </div>



            </section>

        </Fragment>
    );

}

export default PostLoginUser;