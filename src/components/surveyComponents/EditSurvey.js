import React, { useEffect, useState } from "react";
import useFetch from "../useFetch"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button } from "@material-ui/core"
import { useHistory, useParams } from "react-router";
import EditQuestion from "../questionComponents/EditQuestion";
import Navbar from "../Navbar";




const API_URL ="http://localhost:8080/apisurveys/"



const EditSurvey = ({updateSurvey}) =>{
    const {id} = useParams()
    // const { data: surveys, isPending, error } = useFetch(API_URL+survey.surveyID)
    const [questions, setQuestions] = useState([])
    const history = useHistory();


    useEffect(() => getQuestions(API_URL, id), []);

    const getQuestions =(API_URL, id) => {
        fetch(API_URL+id)
        .then(res => res.json())
        .then(data => {
            setQuestions(data.questions)
           
        })
    }
    
    // const startQuestions = (id) =>{
    //     history.push('/survey/'+id);
    // }

    const deleteQuestion = (id) =>{
        alert(id+" question was deleted")
    }



    const updateQuestion = () =>{

    }
    

    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditQuestion updateQuestion={updateQuestion} data={row.original}/>
        },
        {
           Header: "Question",
           accessor: "question"
        },
        {
            Header: "Answer",
            accessor: "answers[0].answer"
        },
        {
            Header: "Answer",
            accessor: "answers[1].answer"
        },
        {
            Header: "Answer",
            accessor: "answers[2].answer"
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "questionID",
            Cell: row => <Button color="secondary" variant="outlined" size="small" onClick={() => deleteQuestion(row.value)}>Delete</Button>
        }
    ]

   

    return(
        
        <div className="survey-page">
            {/* { error && <div>{ error }</div> } */}
            {/* { isPending && <div>Loading...</div> } */}
            <ReactTable filterable={true} data={questions} columns={columns} style={{ marginTop: 10}}/>
        </div>
        
    )
}


export default EditSurvey;