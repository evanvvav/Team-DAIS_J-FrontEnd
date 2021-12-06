import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from "react-router";
import useFetch from "../useFetch";
import { TextField } from "@material-ui/core";


const API_URL = "http://localhost:8080/apisurveys/"
const API_SAVE_ALL_RADIO_ANSWERS = "http://localhost:8080/savealluseranswers/"
const API_SAVE_ALL_OPEN_ANSWERS = "http://localhost:8080/saveallouanswers/"
const API_USER = "http://localhost:8080/apiusers"



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
    const { userName } = useParams()
    // const { data, isPending, error } = useFetch(API_URL+id) ??????????????????????????


    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [users, setUsers] = useState([])
    const [value, setValue] = React.useState([])
    const [error, setError] = React.useState(false)
    // const [helperText, setHelperText] = React.useState('Choose wisely')




    useEffect(() => getQuestions(API_URL, id), []);

    const getQuestions = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions)
                getUsers()

            })
    }

    const getUsers = () => {

        fetch(API_USER)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })



        // return (users) //HOW TO GET JUST USERid?????????????????????????????????????????????????????????????????????????????????
    }



    const handleRadioChange = (event) => {
        setValue([...value, event.target.value]);
        setAnswers({ ...answers, [event.target.name]: event.target.value })
        // setHelperText(' ');
    };

    const handleInputChange = (e) => {
        // e.preventdefault()
        setAnswers({ ...answers, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        let allRadioButtonQusetionId = []
        let allOpenAnswerQusetionId = []
        let radioButtonAnswersBody = []
        let openAnswersBody = []


        const userID = getUserID(userName)




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
                "user": { "userID": userID }
            })
        }

        for (let i = 0; i < allOpenAnswerQusetionId.length; i++) {
            openAnswersBody.push({
                "answerText": answers[allOpenAnswerQusetionId[i]],
                "user": { "userID": userID },
                "question": { "questionID": allOpenAnswerQusetionId[i] }
            })
        }

        if (radioButtonAnswersBody !== null) {
            fetch(API_SAVE_ALL_RADIO_ANSWERS, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(radioButtonAnswersBody)
            })
        }

        if (openAnswersBody !== null) {
            fetch(API_SAVE_ALL_OPEN_ANSWERS, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
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


    const getUserID = (name) => {
        let userID = 0
        users.map((user) => { /// HOW TO MAKE IT BETTER?????????????????????????????????????????????????????????????????????????????
            if (user.userName === name) {
                userID = user.userID
            }
        })
        return userID
    }




    return (

        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                {questions.map((question, index) => (
                    (question.questionType === "radio-button question" ? (
                        <><FormLabel component="legend" key={question.questionID}>{question.question}</FormLabel>
                            <RadioGroup aria-label="quiz" name={question.questionID} value={value[index]} onChange={handleRadioChange}>
                                {question.answers.map((answer) => (

                                    <FormControlLabel key={answer.answerID} value={answer.answer}
                                        control={<Radio required={true} />} label={answer.answer} />

                                ))}
                            </RadioGroup>
                            {/* <FormHelperText>{helperText}</FormHelperText> */}
                        </>
                    ) : (
                        <>
                            <label>{question.question}</label>
                            <TextField
                                required
                                margin="dense"
                                name={question.questionID}
                                value={answers.answer}
                                onChange={e => handleInputChange(e)}
                                label="Open answer"
                                fullWidth />
                        </>
                    ))
                )
                )}
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                    Check Answer
                </Button>

            </FormControl>
        </form>
    )
}

export default StartSurvey;