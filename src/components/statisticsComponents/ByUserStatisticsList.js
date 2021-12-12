import React, { useEffect, useState } from "react"
import ReactTable from "react-table"
import 'react-table/react-table.css';
import { useHistory } from "react-router"
import { Button } from "@material-ui/core"

import authService from "../../services/auth.service"


const API_URL = "http://localhost:8080/apirespondents"



const ByUserStatistics = () => {

    const history = useHistory();
    const user = authService.getCurrentUser();

    const [users, setUsers] = useState([]);

    useEffect(() => getSurveys(API_URL), []);

    const getSurveys = (API_URL) => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setUsers(data)

            })
    }


    const showStatistics = (id) => {
        history.push('/statisticsByUser/' + id);
    }






    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 200,
            accessor: "respondentID",
            Cell: row => <Button color="primary" variant="outlined" size="small" onClick={() => showStatistics(row.value)}>Show Statistics</Button>
        },
        {
            Header: "Name",
            accessor: "respondentName"
        },
        {
            Header: "Number of Radio Answers",
            accessor: "userAnswers.length"
        },
        {
            Header: "Number of Open  Answers",
            accessor: "openUserAnswers.length"
        }
    ]


    return (

        <div >
            {user ? (
                <>
                    <ReactTable filterable={true} data={users} columns={columns} style={{ marginTop: 10, textAlign: "center" }} />
                </>
            ) : (
                <div className="access-denied">
                    <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
                </div>
            )}
        </div>

    )
}

export default ByUserStatistics;