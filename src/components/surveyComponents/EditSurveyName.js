import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';




const EditSurveyName = ({updateSurveyName, surveyDesc}) => {
    
    const [surveyName, setSurveyName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setSurveyName(surveyDesc)
        setOpen(true);
        
    };

    const handleInputChange = (event) =>{
        setSurveyName(event.target.value)
    }
  
    const handleClose = () => {
        setOpen(false);
    };


    const UpdateSurveyName = () =>{
        updateSurveyName(surveyName)
        handleClose();
    }


    

    
    
    return ( 
        <div>
        <Button style={{marginLeft: 100}} variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
            Edit name
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Survey Name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="surveyDesc"
                    value={surveyName}
                    onChange={e => handleInputChange(e)}
                    label="Survey Name"
                    fullWidth
                />
                </DialogContent>
              
                
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={UpdateSurveyName} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
 
export default EditSurveyName;