import React, { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import Config from '../Config.json';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';


const ProjectGrid = (props) => {
    debugger;
    // const { addToast } = useToast('');

    const [Data_array, SetDataarray] = useState([]);
    let [ProjectData, SetProjectData] = useState([]);
    let history = useHistory();
    const Values = [];

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
        { value: 2, label: 'Progress' }
    ];


    let UserDetails = props.udetails;
    //console.log("project_grid", UserDetails);

    const Token = UserDetails.data.token.Access;

    const Update_Project = item => () => {
        debugger;
        // console.log("ProjectItemid", item.id);
        // console.log("ProjectItem", item);

        localStorage.setItem("ProjectId", item.id);
        let prodata = (localStorage.setItem("ProjectData", JSON.stringify(item)));

        history.push({
            pathname: "/Project_Update",
            state: {
                Project_Id: item.id,
                project_Data: item,
                udetails: UserDetails
            }
        });
    }

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
    useEffect(() => {
        axios.get(`${Config.BaseUrl}${Config.Project_Add_Api}`, header)
            .then((response) => {
                //console.log("Project_Get_Success", response.data);
                debugger;
                ProjectData = (response.data.data);
                Get_Project_Data();

                //console.log("ProjectData.length", ProjectData.length)
            })
            .catch((error) => {
                //console.log("Project_Get_Error", error.response);
            });

    }, []);

    const header = {
        headers: {
            Authorization: `Bearer ${Token}`
        }
    }

    const Get_Project_Data = () => {
        debugger;

        for (let i = 0; i < ProjectData.length; i++) {
            let item = {};
            item.id = ProjectData[i].id;
            item.Sno = i + 1;
            item.UserName = ProjectData[i].user_Info.username;
            item.Billtype = ProjectData[i].billtype;
            item.ProjectName = ProjectData[i].projectname;
            item.TaskName = ProjectData[i].taskname;
            item.Status = ProjectData[i].status;
            item.Notes = ProjectData[i].notes;
            item.Hours = ProjectData[i].hours;
            item.StartDate = moment(ProjectData[i].start_date).format("MM-DD-YYYY");
            item.EndDate = moment(ProjectData[i].end_date).format("MM-DD-YYYY");
            item.btn = (
                <Link
                    onClick={
                        Update_Project(ProjectData[i])
                    }
                    className="btn btn-Edit">EditProject
                </Link>);

            Values.push(item);

        }
        SetDataarray(Values);

    }
    const Project_Submit = (e) => {
        e.preventDefault();
        let startdate = moment(Startdate).format("YYYY-MM-DD HH:mm:ss")
        //console.log("Startdate", startdate);
    }

    const Project_Details = {
        columns: [
            {
                label: 'S No',
                field: 'Sno',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Name',
                field: 'UserName',
                width: 270,
            },
            {
                label: 'BillType',
                field: 'Billtype',
                width: 200,
            },
            {
                label: 'ProjectName',
                field: 'ProjectName',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'TaskName',
                field: 'TaskName',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Hours',
                field: 'Hours',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Status',
                field: 'Status',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Notes',
                field: 'Notes',
                sort: 'asc',
                width: 100,
            },

            {
                label: 'Start Date',
                field: 'StartDate',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'End Date',
                field: 'EndDate',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Edit',
                field: 'btn',
                sort: 'disabled',
                width: 100,
            },
        ],
        rows: Data_array
    };




    return (
        <div>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={Project_Details}
                pagingTop
                searchTop
                searchBottom={false}
                barReverse
            />
        </div>

    );

};

export default ProjectGrid;