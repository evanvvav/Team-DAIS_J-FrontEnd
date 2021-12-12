import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from "react-router";
import { TextField } from "@material-ui/core";



const API_URL = "http://localhost:8080/apisurveys/"
const API_RESPONDENTS = "http://localhost:8080/apirespondents"
const API_SAVE_ALL_RADIO_ANSWERS = "http://localhost:8080/savealluseranswers"
const API_SAVE_ALL_OPEN_ANSWERS = "http://localhost:8080/saveallouanswers"



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));


const StartSurvey = ({ name }) => {
    const classes = useStyles()
    const history = useHistory()


    const { id } = useParams()
    const { respondentName } = useParams()


    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [respondents, setRespondents] = useState([])
    const [value, setValue] = React.useState([])




    useEffect(() => getQuestions(API_URL, id), []);

    const getQuestions = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions)
                getRespondents()

            })
    }

    const getRespondents = () => {

        fetch(API_RESPONDENTS)
            .then(res => res.json())
            .then(data => {
                setRespondents(data)
            })
    }



    const handleRadioChange = (event) => {
        setValue([...value, event.target.value]);
        setAnswers({ ...answers, [event.target.name]: event.target.value })
    };

    const handleInputChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        let allRadioButtonQusetionId = []
        let allOpenAnswerQusetionId = []
        let radioButtonAnswersBody = []
        let openAnswersBody = []


        const respondentID = getRespondentID(respondentName)




        questions.map((question) => {
            if (question.questionType === "radio-button question") {
                allRadioButtonQusetionId.push(question.questionID)
            } else {
                allOpenAnswerQusetionId.push(question.questionID)
            }
        })

        for (let i = 0; i < allRadioButtonQusetionId.length; i++) {
            radioButtonAnswersBody.push({
                "answer": { "answerID": getAnswerId(answers[allRadioButtonQusetionId[i]]) },
                "respondent": { "respondentID": respondentID }
            })
        }

        for (let i = 0; i < allOpenAnswerQusetionId.length; i++) {
            openAnswersBody.push({
                "answerText": answers[allOpenAnswerQusetionId[i]],
                "respondent": { "respondentID": respondentID },
                "question": { "questionID": allOpenAnswerQusetionId[i] }
            })
        }

        if (radioButtonAnswersBody !== null) {
            fetch(API_SAVE_ALL_RADIO_ANSWERS, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(radioButtonAnswersBody)
            })
        }

        if (openAnswersBody !== null) {
            fetch(API_SAVE_ALL_OPEN_ANSWERS, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(openAnswersBody)
            })
        }

        alert("Thank you for your answers")
        history.push("/surveyList")

    }


    const getAnswerId = (string) => {
        let id = 0;
        questions.map((question) => {
            question.answers.map((answer) => {
                if (answer.answer === string) {
                    id = answer.answerID
                }
            })
        })
        return id
    }


    const getRespondentID = (respondentName) => {
        let respondentID = 0
        respondents.map((respondent) => {
            if (respondent.respondentName === respondentName) {
                respondentID = respondent.respondentID
            }
        })
        return respondentID
    }



    return (

        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
                {questions.map((question, index) => (
                    (question.questionType === "radio-button question" ? (
                        <><FormLabel style={{ paddingBottom: 2, color: "black", fontSize: 23 }} component="legend" key={question.questionID}>{question.question}</FormLabel>
                            <RadioGroup style={{ paddingBottom: 25 }} aria-label="quiz" name={question.questionID} value={value[index]} onChange={handleRadioChange}>
                                {question.answers.map((answer) => (

                                    <FormControlLabel key={answer.answerID} value={answer.answer}
                                        control={<Radio required={true} />} label={answer.answer} />

                                ))}
                            </RadioGroup>
                        </>
                    ) : (
                        <>
                            <FormLabel style={{ color: "black", fontSize: 23 }} key={question.questionID}>{question.question}</FormLabel>
                            <TextField
                                required
                                margin="dense"
                                name={question.questionID}
                                value={answers.answer}
                                onChange={e => handleInputChange(e)}
                                label="Open answer"
                                style={{ paddingBottom: 25 }}
                                autoComplete="off"
                                fullWidth />
                        </>
                    ))
                )
                )}
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                    Submit
                </Button>

            </FormControl>
        </form>
    )
}

export default StartSurvey;