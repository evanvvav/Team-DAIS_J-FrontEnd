import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


const API_URL ="https://opentdb.com/api.php?amount=10&type=multiple"


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
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(false)
    const [helperText, setHelperText] = React.useState('Choose wisely')
    const [answers, setAnswers] = useState([])

    

    useEffect(() => {
        getMovies(API_URL)
        
    }, [])

    const getMovies =(API) => {
        fetch(API).then(res => res.json())
        .then(data => {
            setQuestions(data.results[0].question);
            setAnswers(data.results[0].incorrect_answers)
           
            
            
        })
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
      };

    console.log(questions)
    console.log(answers)
    

   

    return(
        <form /*onSubmit={handleSubmit}*/>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                <FormLabel component="legend">{questions}</FormLabel>

                <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    {answers.map(answer => (
                        <FormControlLabel value={answer} control={<Radio />} label={answer} /> 
                    ))} 
                </RadioGroup>

                <FormHelperText>{helperText}</FormHelperText>
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                    Check Answer
                </Button>
            </FormControl>
        </form>
    )
}

export default QuestionPage;