import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';


const EditAnswer = ({updateAnswer, data, questionID}) => {

    const [answer, setAnswer] = React.useState("");
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setAnswer(data.answer)
        setOpen(true)
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    

    const handleInputChange = (event) =>{
        setAnswer(event.target.value)
    }

    const editQuestion = () =>{
        updateAnswer(answer, data, questionID);
        handleClose();
    }

    return ( 
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
                    name="answer"
                    value={answer}
                    onChange={e => handleInputChange(e)}
                    label="Answer"
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
 
export default EditAnswer;