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
import DeleteIcon from '@material-ui/icons/Delete';
import EditAnswer from "../answerComponents/EditAnswer";
import CreateAnswer from "../answerComponents/CreateAnswer";
import { SettingsInputCompositeTwoTone } from "@material-ui/icons";





const API_URL = "http://localhost:8080/apisurveys/"
const API_URL_QUESTIONS = "http://localhost:8080/apiquestions/"
const API_URL_ANSWER = "http://localhost:8080/apianswers/"

const API_SAVE_ALL_QUESTIONS = "http://localhost:8080/saveallquestions"
const API_SAVE_ALL_ANSWERS = "http://localhost:8080/saveallanswers"



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
                let radioQuestions = []
                let openQuestions = []



                for (let i = 0; i < data.questions.length; i++) {
                    if (data.questions[i].questionType === "radio-button question") {
                        radioQuestions.push(data.questions[i])
                    } else {
                        openQuestions.push(data.questions[i])
                    }
                }

                console.log(openQuestions)

                setQuestions([...radioQuestions, ...openQuestions])
                setSurveyDesc(data.surveyDesc)
            })
    }


    const createNewQuestions = (data) => {
        let questionListBody = []
        let answers = []


        for (let i = 0; i < data.length; i++) {
            questionListBody.push({
                "survey": { "surveyID": id },
                "question": data[i].question,
                "questionType": data[i].questionType
            })
            answers.push(data[i].answer1)
            answers.push(data[i].answer2)
            answers.push(data[i].answer3)
        }
        //add question/s to DB
        fetch(API_SAVE_ALL_QUESTIONS, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(questionListBody)
        }).then(res => getQuestions(API_URL, id))


    }

    console.log(questions)

    const createAnswers = (data) => {
        let answersLength = data.length;
        let answersListBody = []
        let answerNumber = 0;
        let questionNumber = 0;
        let maxQuestionLength = questions.length
        let freeCellNumber = 0;


        if (data[0].answer === "") {
            alert("Enter the answer")
        }


        while (answerNumber < answersLength) {

            while (questionNumber < (maxQuestionLength)) {
                freeCellNumber = 3 - questions[questionNumber].answers.length
                if (freeCellNumber > 0) {
                    break
                } else {
                    questionNumber++
                }
            }

            // if (freeCellNumber === 0) {
            //     alert("No free cell for answer")
            //     break
            // }

            for (let w = 0; w < freeCellNumber; w++) {
                answersListBody.push({
                    "question": { "questionID": questions[questionNumber].questionID },
                    "answer": data[answerNumber].answer
                })
                answerNumber++
                if (answerNumber === answersLength || answerNumber > answersLength) {
                    break
                }
            }
            questionNumber++
        }

        addAnswersToQusetion(answersListBody)

    }

    const addAnswersToQusetion = (answers) => {
        fetch(API_SAVE_ALL_ANSWERS, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(answers)
        }).then(res => getQuestions(API_URL, id))
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
        fetch(API_URL_QUESTIONS + data.questionID, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "question": question,
                "survey": { "surveyID": id },
                "questionType": data.questionType
            })

        })
            .then(res => getQuestions(API_URL, id))
            .catch(err => console.error(err))
    }

    const updateAnswer = (answer, data, questionID) => {
        fetch(API_URL_ANSWER + data.answerID, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "question": { "questionID": questionID },
                "answer": answer
            })

        })
            .then(res => getQuestions(API_URL, id))
            .catch(err => console.error(err))
    }


    console.log(questions)

    const columns = [
        {
            Header: "Question",
            accessor: "question"
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            Cell: row => <EditQuestion updateQuestion={updateQuestion} data={row.original} />
        },
        {
            Header: "Answer",
            accessor: "answers[0].answer"
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            Cell: row => { return row.original.questionType === "radio-button question" ? <EditAnswer updateAnswer={updateAnswer} data={row.original.answers[0]} questionID={row.original.questionID} /> : <></> }
        },
        {
            Header: "Answer",
            accessor: "answers[1].answer"
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            Cell: row => { return row.original.questionType === "radio-button question" ? <EditAnswer updateAnswer={updateAnswer} data={row.original.answers[1]} questionID={row.original.questionID} /> : <></> }
        },
        {
            Header: "Answer",
            accessor: "answers[2].answer"
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            Cell: row => { return row.original.questionType === "radio-button question" ? <EditAnswer updateAnswer={updateAnswer} data={row.original.answers[2]} questionID={row.original.questionID} /> : <></> }
        },
        {
            sortable: false,
            filterable: false,
            width: 75,
            accessor: "questionID",
            Cell: row => <Button color="secondary" variant="outlined" size="small" onClick={() => deleteQuestion(row.value)}><DeleteIcon /></Button>
        }
    ]



    return (

        <div className="edit-survey-page">
            <div className="edit-survey-page-header" style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "20px" }}>
                <CreateQuestion createNewQuestions={createNewQuestions} />
                <CreateAnswer createAnswers={createAnswers} />
                <h2>{surveyDesc}</h2>
                <EditSurveyName updateSurveyName={updateSurveyName} surveyDesc={surveyDesc} />
                <Button color="secondary" variant="outlined" size="medium" onClick={() => deleteSurvey()}>Delete survey</Button>
            </div>
            {/* { error && <div>{ error }</div> } */}
            {/* { isPending && <div>Loading...</div> } */}
            <ReactTable filterable={true} data={questions} columns={columns} style={{ marginTop: 10, textAlign: "center" }} />
        </div>

    )
}


export default EditSurvey;