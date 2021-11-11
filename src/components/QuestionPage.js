import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


const API_URL ="http://localhost:8080/apiquestions"


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));


const QuestionPage = () =>{
    const classes = useStyles()

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [value, setValue] = React.useState([])
    const [error, setError] = React.useState(false)
    const [helperText, setHelperText] = React.useState('Choose wisely')

    

    useEffect(() => {
        getQuestions(API_URL)
        
    }, [])

    const getQuestions =(API) => {
        fetch(API)
        .then(res => res.json())
        .then(data => {
            setQuestions(data)
              
           
            
        })
    }


    const handleRadioChange = (event) => {
        setValue([...value, event.target.value]);
        setAnswers({...answers, [event.target.name]: event.target.value})
        setHelperText(' ');
        setError(false);
        console.log(answers)
        console.log(event.target.getAttribute("id"))
        // console.log(event.target.options[value].getAttribute('data-key'))
        
    };

    const handleSubmit = () =>{
        // console.log(answers)
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

export default QuestionPage;