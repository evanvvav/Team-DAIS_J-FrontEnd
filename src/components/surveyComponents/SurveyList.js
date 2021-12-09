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
import { Link } from "react-router-dom";
import Card from "../Card";



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
            fetch(API_URL + delete_id, {
                method: "DELETE",
                headers: { 'Authorization': 'Bearer ' + user.jwt }
            })
                .then(res => getSurveys(API_URL))
                .catch(err => console.error(err))
        }
    }






    return (

        <div>
            {surveys.map((survey) => (
                <Card styles={{ margin: 25 }} >
                    <div className="survey-list">
                        <div className="info">
                            <StartSurvey startSurvey={startSurvey} id={survey.surveyID} />
                            <div className="questions-length">{survey.questions.length}</div>
                            <h3>{survey.surveyDesc}</h3>
                        </div>
                        <div>
                            {user ? (<Button style={{ margin: 10 }} color="primary" variant="outlined" size="medium" onClick={() => editSurvey(survey.surveyID)}>Edit</Button>) : <></>}
                            {user ? (<Button style={{ margin: 10 }} color="secondary" variant="outlined" size="medium" onClick={() => deleteSurvey(survey.surveyID)}>Delete</Button>) : <></>}
                        </div>
                    </div>
                </Card>
            ))}

        </div>

    )
}


export default SurveysList;