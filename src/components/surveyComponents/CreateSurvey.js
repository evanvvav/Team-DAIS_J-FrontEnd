import { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../../services/auth.service";

const CreateSurvey = () => {
  const [name, setName] = useState('');

  const history = useHistory();
  const user = authService.getCurrentUser();


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/apisurveys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + user.jwt
      },
      body: JSON.stringify(name)
    }).then(() => {
      // history.go(-1);
      history.push('/surveyList');
    })
  }

  return (
    <div className="create">
      {user ? (
        <>
          <h1>Create New Survey</h1>
          <form onSubmit={handleSubmit}>
            <label>Survey's name:</label>
            <input
              type="text"
              required
              style={{ width: "400px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button>Create</button>
          </form>
        </>
      ) : (
        <div className="access-denied">
          <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
        </div>
      )}
    </div>
  );
}

export default CreateSurvey;