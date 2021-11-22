import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateSurvey = () => {
  const [name, setName] = useState('');

  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/apisurveys', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name)
    }).then(() => {
      // history.go(-1);
      history.push('/surveyList');
    })
  }

  return (
    <div className="create">
      <h2>Create New Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>Survey's name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
}
 
export default CreateSurvey;