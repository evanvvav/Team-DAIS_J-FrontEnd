import Button from '@restart/ui/esm/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const API_URL ="http://localhost:8080/apisurveys/"

const SurveyList = ({ surveys, deleteSurvey }) => {
    const history = useHistory();

    const editSurvey = (id)=> {
        history.push("/editSurvey/"+id);
    }

    const toDelete = (id) => {
        deleteSurvey(id)
    }

    

  return (
    <div className="survey-list">
      {surveys.map(survey => (
        <div className="survey-preview" key={survey.surveyID} >
            <Link to={`/survey/${survey.surveyID}`}>
                <div className="survey-preview-link">
                    <h2>{ survey.surveyDesc }</h2>
                </div>
            </Link>
            <Button onClick={() => editSurvey(survey.surveyID)}>Edit</Button>
            <Button onClick={() => toDelete(survey.surveyID)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
 
export default SurveyList;