import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v4 as uuidv4 } from 'uuid';




const CreateAnswer= ({ createAnswers }) => {

    // const [surveyName, setSurveyName] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [inputFields, setInputFields] = React.useState([
        { id: uuidv4(), answer: '' }]);




    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleInputChange = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }



    const handleClose = () => {
        // setInputFields([])
        setOpen(false);
    };


    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), answer: ''}])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    const CreateNewQuestion = () => {
        createAnswers(inputFields);
        setOpen(false)
        // setInputFields([])
    }



    return (
        <div>
            <Button style={{ marginRight: 100 }} variant="outlined" color="primary" size="medium" onClick={handleClickOpen} >
                Create Answer/s
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{display: "flex"}}>
                    <h2 style={{color: "red"}}>ATTENTION</h2>
                    <p>Enter all answers. They will be added to the first free cells in turn.</p>
                
                
                </DialogTitle>
                <DialogContent>
                    {inputFields.map(inputField => (
                        <div key={inputField.id}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="answer"
                                value={inputField.answer}
                                onChange={event => handleInputChange(inputField.id, event)}
                                label="Answer"
                                fullWidth
                            />
                           
                            <Button disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>Remove</Button>
                            <Button onClick={handleAddFields}>add</Button>
                        </div>
                    ))}
                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={CreateNewQuestion} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateAnswer;