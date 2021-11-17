
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PinDropSharp } from '@material-ui/icons';

const API_URL ="http://localhost:8080/apiquestions/"


export default function EditQuestion({updateSurvey, data }){

    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setQuestions(data.question)
        setAnswers(data.answers)
        setOpen(true);
        
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    

    const handleInputChange = (event) =>{
        setQuestions({...questions, [event.target.name]: event.target.value })
    }

    // const updateCustomer = () =>{
    //     updateSurvey(questions, props.customer.links[0].href);
    //     handleClose();
    // }


    

    return(
        <div>
        <Button /*style={{margin: 10}}*/ variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
            <DialogContent>
            
                <TextField
                    autoFocus
                    margin="dense"
                    name="question"
                    value={questions}
                    onChange={e => handleInputChange(e)}
                    label="Question"
                    fullWidth
                />
                {answers.map((answer)=>(
                    <TextField
                        autoFocus
                        margin="dense"
                        name="answer"
                        value={answer.answer}
                        onChange={e => handleInputChange(e)}
                            label="Answer"
                            fullWidth
                        /> 
                ))}
                </DialogContent>
              
                
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {/* <Button onClick={updateCustomer} color="primary">
                    Save
                </Button> */}
            </DialogActions>
        </Dialog>
        </div>
    );
}