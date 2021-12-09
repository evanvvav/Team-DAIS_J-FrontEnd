import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v4 as uuidv4 } from 'uuid';




const CreateQuestion = ({ createNewQuestions }) => {

    const [open, setOpen] = React.useState(false);
    const [inputFields, setInputFields] = React.useState([
        { id: uuidv4(), question: '', questionType: "radio-button question" }]);




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
        setInputFields([{ id: uuidv4(), question: '', questionType: "radio-button question" }])
        setOpen(false);
    };


    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), question: '', questionType: "radio-button question" }])
    }

    const handleRemoveFields = (id) => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    const CreateNewQuestion = () => {
        createNewQuestions(inputFields);
        setInputFields([{ id: uuidv4(), question: '', questionType: "radio-button question" }])
        setOpen(false)
    }



    return (
        <div>
            <Button variant="outlined" color="primary" size="medium" onClick={handleClickOpen} >
                Create New Question/s
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Question</DialogTitle>
                <DialogContent>
                    {inputFields.map(inputField => (
                        <div key={inputField.id}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="question"
                                value={inputField.question}
                                onChange={event => handleInputChange(inputField.id, event)}
                                label="Question name"
                                fullWidth
                            />

                            <label style={{ paddingTop: 20, marginRight: 10 }}>Questions Type:</label>
                            <select
                                name="questionType"
                                value={inputField.questionType}
                                style={{ padding: 5, marginRight: 20, marginBottom: 25 }}
                                onChange={event => handleInputChange(inputField.id, event)}
                            >
                                <option value="radio-button question" >radio button</option>
                                <option value="open question">open question</option>
                            </select>

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

export default CreateQuestion;