import React, { useEffect, useState } from "react";

import ReactTable from "react-table";
import 'react-table/react-table.css';

import { useHistory } from "react-router";
import { Last } from "react-bootstrap/esm/PageItem";
import StatisticsBySurvey from "./StatisticsBySurvey";
import { Button, TextField } from "@material-ui/core"



const API_URL = "http://localhost:8080/apisurveys/"




const BySurveyStatisticsPage = () => {

    const history = useHistory();
    const [surveys, setSurveys] = useState([]);

    useEffect(() => getSurveys(API_URL), []);

    const getSurveys = (API_URL) => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setSurveys(data)

            })
    }


    const showStatistics = (id) => {
        history.push('/statisticsBySurvey/' + id);
    }






    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 200,
            accessor: "surveyID",
            Cell: row => <Button color="primary" variant="outlined" size="small" onClick={() => showStatistics(row.value)}>Show Statistics</Button>
        },
        {
            Header: "Name",
            accessor: "surveyDesc"
        },
        {
            Header: "number of questions",
            accessor: "questions.length"
        }
    ]



    return (

        <div className="survey-page">
            <ReactTable filterable={true} data={surveys} columns={columns} style={{ marginTop: 10, textAlign: "center" }} />
        </div>

    )
}


export default BySurveyStatisticsPage;