import React, { useEffect, useState } from "react";
import useFetch from "../useFetch"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button } from "@material-ui/core"
import { useHistory } from "react-router";
import EditSurvey from "./EditSurvey"
import StartSurvey from "./StartSurvey";
import { Last } from "react-bootstrap/esm/PageItem";
import authService from "../../services/auth.service";



const API_URL = "http://localhost:8080/apisurveys/"




const SurveysList = () => {

    const user = authService.getCurrentUser();
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


    const startSurvey = (id, name) => {
        history.push('/survey/' + id + '/' + name);
    }

    const editSurvey = (id) => {
        history.push("/editSurvey/" + id);
    }

    const deleteSurvey = (delete_id) => {
        //ask if you are really want to delete
        if (window.confirm("Are you sure?")) {
            fetch(API_URL + delete_id, { method: "DELETE" })
                .then(res => getSurveys(API_URL))
                .catch(err => console.error(err))
        }
    }





    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 110,
            accessor: "surveyID",
            Cell: row => <StartSurvey startSurvey={startSurvey} id={row.value} />
        },
        {
            Header: "Name",
            accessor: "surveyDesc"
        },
        {
            Header: "number of questions",
            accessor: "questions.length"
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "surveyID",
            Cell: row => {return user ? (<Button style={{ margin: 10 }} color="primary" variant="outlined" size="small" onClick={() => editSurvey(row.value)}>Edit</Button>):<></>}
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "surveyID",
            Cell: row => {return user ? (<Button style={{ margin: 10 }} color="secondary" variant="outlined" size="small" onClick={() => deleteSurvey(row.value)}>Delete</Button>):<></>}
        }
        
    ]



    return (

        <div className="survey-page">
            <ReactTable filterable={true} data={surveys} columns={columns} style={{ marginTop: 10, textAlign: "center" }} />
        </div>

    )
}


export default SurveysList;