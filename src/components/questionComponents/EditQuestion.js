
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { SvgIcon } from '@material-ui/core';
// import EditIcon from '@mui/icons-material/Edit';
import EditIcon from '@material-ui/icons/Edit';



export default function EditQuestion({updateQuestion, data }){

    const [questions, setQuestions] = React.useState("");
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setQuestions(data.question)
        setOpen(true)
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    

    const handleInputChange = (event) =>{
        setQuestions(event.target.value)
    }

    const editQuestion = () =>{
        updateQuestion(questions, data);
        handleClose();
    }


    

    return(
        <div>
        <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
            <EditIcon/>
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
                </DialogContent>      
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={editQuestion} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}