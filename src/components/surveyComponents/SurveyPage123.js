import React, { useEffect, useState } from "react";
import useFetch from "../useFetch"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button } from "@material-ui/core"
import { useHistory } from "react-router";
import EditSurvey from "./EditSurvey"
import SurveyList from "./SurveyList";

const API_URL ="http://localhost:8080/apisurveys/"

const SurveyPage123 = () => {
    const history = useHistory();
    const [surveys, setSurveys] = useState([]);

    useEffect(() => getSurveys(API_URL), []);

    const getSurveys =(API_URL) => {
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            setSurveys(data)
           
        })
    }

    const deleteSurvey = (delete_id) =>{
        //ask if you are really want to delete
        if(window.confirm("Are you sure?")){
            fetch(API_URL+delete_id, {method: "DELETE"})
            .then(res => res.json())
            .then(data => setSurveys(data))
            .catch(err => console.error(err))
        }
    }

    


    return ( 
        <div className="home">
        { surveys && <SurveyList surveys={surveys} deleteSurvey={deleteSurvey} /> }
      </div>
    );
  
     
}
 
export default SurveyPage123;