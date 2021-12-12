import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const Navbar = () => {

  const user = AuthService.getCurrentUser();

  const logOut = () => {
    if (window.confirm("Are you sure?")) {
      AuthService.logout()
      window.location.reload()
    }
  }

  return (
    <nav className="navbar">
      <Link to="/"><h1>DAIS_J</h1></Link>
      <div className="links">
        <Link to="/surveyList" style={{
          color: '#f1356d',
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px"
        }}>Surveys List</Link>

        {user ? (
          <>
            <Link to="/createSurvey" style={{
              color: '#f1356d',
              backgroundColor: 'white',
              borderRadius: '8px',
              fontSize: "20px",
              border: "2px solid #f1356d",
              padding: "10px"
            }}>New Survey</Link>

            <Link to="/statisticsList" style={{
              color: '#f1356d',
              backgroundColor: 'white',
              borderRadius: '8px',
              fontSize: "20px",
              border: "2px solid #f1356d",
              padding: "10px"
            }}>Statistics</Link>
          </>) : (<></>)}
      </div>




      <div className="login">
        {user ? (
          <h2>Admin</h2>
        ) : (<></>)}
        <Link to="/login" style={{
          color: 'white',
          backgroundColor: '#f1356d',
          borderRadius: '8px',
          fontSize: "20px",
          padding: "10px"
        }}>SignIn</Link>

        {user ? (
          <>
            <Button style={{
              color: 'white',
              backgroundColor: '#f1356d',
              borderRadius: '8px',
              fontSize: "13px",
              padding: "10px",
              marginLeft: "20px",
              border: "none"
            }}
              onClick={() => logOut()}>LogOut</Button>
          </>) : (<></>)}
      </div>
    </nav>
  );
}

export default Navbar;