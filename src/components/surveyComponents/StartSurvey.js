import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useParams } from "react-router";
import useFetch from "../useFetch";


const API_URL ="http://localhost:8080/apisurveys/"
const API_SAVE_ANSWERS = "http://localhost:8080/apiuseranswers/"


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));


const StartSurvey = () =>{
    const classes = useStyles()

    const {id} = useParams()
    // const { data, isPending, error } = useFetch(API_URL+id) ??????????????????????????

    
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [answers2, setAnswers2] = useState([])
    const [value, setValue] = React.useState([])
    const [error, setError] = React.useState(false)
    const [helperText, setHelperText] = React.useState('Choose wisely')

    
   

    useEffect(() => getQuestions(API_URL, id), []);

    const getQuestions =(API_URL, id) => {
        fetch(API_URL+id)
        .then(res => res.json())
        .then(data => {
            setQuestions(data.questions)
      
        })
    }


    const handleRadioChange = (event) => {
        setValue([...value, event.target.value]);
        setAnswers({...answers, [event.target.name]: event.target.value})
        setHelperText(' ');

        
    };

    const handleSubmit = () => { 
        let allQusetionId = []
        let answersBody = []

        questions.map((question)=>{
            allQusetionId.push(question.questionID)
        })
         
        for(let i=0; i<allQusetionId.length; i++){
            answersBody.push({
                "answer": {"answerID": getAnswerId(answers[allQusetionId[i]])}
            })
        }
        alert(answersBody)

        fetch(API_SAVE_ANSWERS, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(answersBody)
        })
    }
    
    


    const getAnswerId = (string) => {
        let id = 0;
        questions.map((question) => {
            question.answers.map((answer)=>{
                if(answer.answer===string){
                    id = answer.answerID
                }
            })
        })
        return id
    }
 
    
    
   

    return(
       
        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                {questions.map((question, index) => (
                    <><FormLabel component="legend" key={question.questionID}>{question.question}</FormLabel>
                            <RadioGroup aria-label="quiz" name={question.questionID} value={value[index]} onChange={handleRadioChange}>
                            {question.answers.map((answer) => (
                            
                                <FormControlLabel key={answer.answerID} value={answer.answer} 
                                control={<Radio />} label={answer.answer} />
                                
                                ))}
                            </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                    </>
                ))}
                     <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                         Check Answer
                     </Button>

            </FormControl>
        </form>
    )
}

export default StartSurvey;