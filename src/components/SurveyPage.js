import React, { useEffect, useState } from "react";
import useFetch from "../useFetch"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button } from "@material-ui/core"
import { useHistory } from "react-router";
import EditSurvey from "./EditSurvey"



const API_URL ="http://localhost:8080/apisurveys"



const SurveysList = () =>{
    
    const { data: surveys, isPending, error } = useFetch(API_URL)
    const history = useHistory();

    
    const startQuestions = (id) =>{
        history.push('/survey/'+id);
    }

    const editQuestion = (id)=>{
        history.push("/editSurvey/"+id);
    }

    const updateSurvey = () => {

    }
    

    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "surveyID",
            Cell: row => <Button color="secondary" variant="outlined" size="small" onClick={() => startQuestions(row.value)}>Start</Button>
        },
        {
           Header: "Name",
           accessor: "surveyDesc"
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "surveyID",
            Cell: row => <Button color="secondary" variant="outlined" size="small" onClick={() => editQuestion(row.value)}>Edit</Button>
        }
    ]

   

    return(
        
        <div className="survey-page">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <ReactTable filterable={true} data={surveys} columns={columns} style={{ marginTop: 10}}/>
        </div>
        
    )
}


export default SurveysList;