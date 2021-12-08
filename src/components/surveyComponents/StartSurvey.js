
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const API = "http://localhost:8080/apirespondents/"




export default function StartSurvey({ startSurvey, id }) {

    const [users, setUsers] = React.useState([])
    const [name, setName] = React.useState("");
    const [open, setOpen] = React.useState(false);

    useEffect(() => getUsers(API), []);

    const getUsers = (API) => {
        fetch(API)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }

    const handleClickOpen = () => {
        setOpen(true)

    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleInputChange = (event) => {
        setName(event.target.value)
    }

    const start = () => {
        let freeName = true;

        // A LOT OF FETCH, EACH TIME THEN U TYPE A TEXT ????????????????????????????????????????????????????????????????????

        for (let i = 0; i < users.length; i++) {
            if (users[i].respondentName === name) {
                freeName = false
                if (users[i].userAnswers.length === 0) { /// to change???????????????????????????????????????????????????
                    startSurvey(id, name)
                    handleClose();
                    break
                } else if (users[i].userAnswers[0].answer.question.survey.surveyID === id) {
                    alert("You have done this survey")
                    break
                } else {
                    startSurvey(id, name)
                    handleClose();
                    break
                }

                // alert("This name is already registered, please choose another")
                // freeName = false
                // break
            }

        }

        if (freeName) {
            fetch(API, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "respondentName": name
                })
            })

            startSurvey(id, name)
            handleClose();
        }

    }


   

    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                Start
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter your name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        value={name}
                        onChange={e => handleInputChange(e)}
                        label="Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={start} color="primary">
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}