import React, { useEffect, useState } from "react";
import useFetch from "../useFetch"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button, TextField } from "@material-ui/core"
import { useHistory, useParams } from "react-router";
import EditQuestion from "../questionComponents/EditQuestion";
import Navbar from "../Navbar";
import UpdateSurveyName from "./EditSurveyName";
import CreateQuestion from "../questionComponents/CreateQuestion";
import EditSurveyName from "./EditSurveyName";




const API_URL = "http://localhost:8080/apisurveys/"
const API_URL_QUESTIONS = "http://localhost:8080/apiquestions/"
const API_SAVE_ALL_QUESTIONS = "http://localhost:8080/saveallquestions"



const EditSurvey = ({ updateSurvey }) => {
    const { id } = useParams()
    // const { data: surveys, isPending, error } = useFetch(API_URL+survey.surveyID)
    const [questions, setQuestions] = useState([])
    const [surveyDesc, setSurveyDesc] = useState("")
    // const [questionsList, setQuestionsList] = useState([])

    const history = useHistory();


    useEffect(() => getQuestions(API_URL, id), []);

    const getQuestions = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions)
                setSurveyDesc(data.surveyDesc)

            })
    }

    // const startQuestions = (id) =>{
    //     history.push('/survey/'+id);
    // }

    const CreateNewQuestions = (questions) => {
        let answerListBody = []
        let questionListBody = []

        questions.map((question) => {
            // questionListTemp.push(questions[i].question)
            questionListBody.push({
                "survey": { "surveyID": id },
                "question": question.question,
                "questionType": "radio-button question"
            })
            // for (let i = 0; i < 3; i++) {
            //     answerListBody.push({
            //         "question": { "questionID": 2 },
            //         "answer": question.answer + i
            //     })
            // }
        })

        console.log(answerListBody)


        // console.log(questionListBody)
        // setQuestionsList(questionListTemp)



        fetch(API_SAVE_ALL_QUESTIONS, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(questionListBody)

        })
            .then(res => getQuestions(API_URL, id))
            .catch(err => console.error(err))
        // console.log(questions.length)
        // console.log(questions)
        // setQuestionsList( questions[0].question)



    }



    const deleteSurvey = () => {
        //ask if you are really want to delete
        if (window.confirm("Are you sure?")) {
            fetch(API_URL + id, { method: "DELETE" })
                .then(res => history.push("/surveyList"))
                .catch(err => console.error(err))
        }
    }

    const deleteQuestion = (delete_id) => {
        //ask if you are really want to delete
        if (window.confirm("Are you sure?")) {
            fetch(API_URL_QUESTIONS + delete_id, { method: "DELETE" })
                .then(res => getQuestions(API_URL, id))
                .catch(err => console.error(err))
        }
    }


    const updateSurveyName = (newSurveyName) => {
        fetch(API_URL + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newSurveyName)

        })
            .then(res => getQuestions(API_URL, id))
            .catch(err => console.error(err))
    }

    const updateQuestion = (question, data) => {
        console.log(questions)
        console.log(data)
        fetch(API_URL_QUESTIONS + data.questionID, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "question": question,
                "survey": { "surveyID": id },
                "questionType": "radio-button question"
            })

        })
            .then(res => getQuestions(API_URL, id))
            .catch(err => console.error(err))
    }

    const i = 0;


    const columns = [
        {
            sortable: false,
            filterable: false,
            width: 150,
            Cell: row => <EditQuestion updateQuestion={updateQuestion} data={row.original} />
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



    return (

        <div className="edit-survey-page">
            <div className="edit-survey-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "20px" }}>
                <CreateQuestion CreateNewQuestions={CreateNewQuestions} />
                <h2>{surveyDesc}</h2>
                <EditSurveyName updateSurveyName={updateSurveyName} surveyDesc={surveyDesc} />
                <Button color="secondary" variant="outlined" size="small" onClick={() => deleteSurvey()}>Delete survey</Button>
            </div>
            {/* { error && <div>{ error }</div> } */}
            {/* { isPending && <div>Loading...</div> } */}
            <ReactTable filterable={true} data={questions} columns={columns} style={{ marginTop: 10, textAlign: "center" }} />
        </div>

    )
}


export default EditSurvey;