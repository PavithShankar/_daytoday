import React, { useState, useEffect } from 'react';
import { useToast, useToasts } from 'react-toast-notifications';
import axios from 'axios';
import Config from '../Config.json';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { format } from "date-fns";
import dateFormat from "dateformat";


const Project_Update = (props) => {


    let UserDetails = {};
    let Project_Data = {};
    let Token = '';

    useEffect(() => {
        UserDetails = JSON.parse(localStorage.getItem("UserDetails"));

        Project_Data = JSON.parse(localStorage.getItem("ProjectData"));
        // Project_Id = JSON.parse(localStorage.getItem("ProjectId"));
        SetProjectName(Project_Data.projectname);
        SetTaskName(Project_Data.taskname);
        SetHours(Project_Data.hours);
        SetNotes(Project_Data.notes);
        Token = UserDetails.data.token.Access;

        Bill_drp();
        Status_drp();
        Date_format()

        // console.log("Project_Data1", Project_Data);

    }, [])
    UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    Token = UserDetails.data.token.Access;
    //console.log("Token", Token);
    //console.log("UserDetails", UserDetails);


    const Bill_drp = () => {
        let billobj = {};
        let billarr = [];


        billobj = {
            label: Project_Data.billtype
        }

        billarr.push(billobj);

        SetBillType(billarr);


    }

    const Status_drp = () => {
        let statusobj = {};
        let status_arr = [];


        statusobj = {
            label: Project_Data.status
        }

        status_arr.push(statusobj);
        SetStatusType(status_arr);


    }

    const Date_format = () => {
        let startdate = moment(Project_Data.start_date).local().toDate();
        let enddate = moment(Project_Data.start_date).local().toDate();
        //let enddate = moment(Project_Data.end_date).format("MM-DD-YYYY h:mm aa")

        //console.log("std", startdate);
        // console.log('end', enddate);
        //console.log('saedfds', saedfds);


        SetStartDate(startdate);
        SetEndDate(enddate);
    }




    const [ProjectName, SetProjectName] = useState(Project_Data.projectname);
    const [TaskName, SetTaskName] = useState(Project_Data.taskname);
    const [Hours, SetHours] = useState(Project_Data.hours);
    const [Notes, SetNotes] = useState(Project_Data.notes);
    const [BillType, SetBillType] = useState(Project_Data.billtype);
    const [StatusType, SetStatusType] = useState(Project_Data.status);
    const [StartDate, SetStartDate] = useState();
    const [EndDate, SetEndDate] = useState();
    const { addToast } = useToasts("");
    const history = useHistory('');

    //console.log("stsdtdtsd", StartDate)



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

        SetBillType(billtype);

    }
    const handleProgresstype = (ptype) => {
        let progresstype = [];

        progresstype.push(ptype);

        SetStatusType(progresstype);

    }
    const Project_Submit = (e) => {
        debugger;
        e.preventDefault();
        let startdate = moment(StartDate).format("YYYY-MM-DD HH:mm:ss");
        let enddate = moment(EndDate).format("YYYY-MM-DD HH:mm:ss")
        let stdate = StartDate.getTime();
        let eddate = EndDate.getTime();
        // console.log("Billtype", BillType[0].label);
        // console.log("progresstype", StatusType[0].label);
        // console.log("stdate", stdate);
        // console.log("eddate", eddate);
        let Hours_regx = /^(([0-9])|([0-1][0-9])|([2][0-3]))(:(([0-9])|([0-5][0-9])))?$/;
        let Hours_valid = Hours_regx.test(Hours);

        // let Bill_Type = Billtype.map((i) => {
        //     return i.value;
        // });
        // let Progress_Type = Progresstype.map((i) => {
        //     return i.value;
        // });
        let Bill_label = BillType.map((i) => {
            return i.label;
        });
        let Progress_label = StatusType.map((i) => {
            return i.label;
        });

        // let Bill_type_Value = Bill_Type[0];
        // let Status_type_Value = Progress_Type[0];
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
        else if (Bill_type_Label === "Select Billtype") {
            addToast("Please Select BillType", {
                appearance: 'error',
                autoDismiss: true
            });

        }
        else if (Status_type_Label === "Select Status") {
            addToast("Please Select Status", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else if (stdate > eddate) {
            addToast("Start Date Shoolud not be Less then End Date ", {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else {
            debugger;
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
            //console.log("formdata", data);
            let Project_Id = JSON.parse(localStorage.getItem("ProjectId"));
            //console.log("Project_Id", Project_Id);

            axios.put(`${Config.BaseUrl}${Config.Project_Add_Api}` + Project_Id, formdata, header)
                .then((response) => {
                    debugger;
                    //console.log("Project_Update_Success_Response", response.data);
                    addToast("Log Added Successfully", {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    history.push("/");


                })
                .catch((error) => {
                    //console.log("Project_Update_Error_response", error.response);
                    addToast("Something went wrong please try again later",
                        {
                            appearance: 'error',
                            autoDismiss: true
                        });
                    history.push("/");
                });
        }
    }


    return (
        <div>
            <Modal
                size="lg"
                show={true}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Log
                                        </Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    <form onSubmit={Project_Submit}>
                        <div className="form-floating mb-2">
                            <input className="form-control"
                                id="projectname"
                                type="text"
                                //required
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
                                //required
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
                                value={BillType}
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
                                //required
                                value={Hours}
                                onChange={(e) => {
                                    SetHours(e.target.value);
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
                                value={StatusType}
                                onChange={handleProgresstype}
                                options={ProgressStatus}
                            />
                        </div>
                        <div className='row col-12'>

                            <div className="form-floating mb-2 col-6">
                                StartDate:
                                                     <DatePicker
                                    selected={StartDate}
                                    onChange={(date) => {
                                        SetStartDate(date);

                                    }}
                                    //readOnly={true}
                                    timeIntervals={15}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </div>
                            <div className="form-floating mb-2 col-6">
                                EndDate:
                                                    <DatePicker
                                    selected={EndDate}
                                    onChange={(date) => {
                                        SetEndDate(date);
                                    }}
                                    //readOnly={true}
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
                                //required
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
    )


}

export default Project_Update;
