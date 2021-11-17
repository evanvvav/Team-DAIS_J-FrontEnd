import { Link } from "react-router-dom";

const Navbar = () => {
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

        <Link to="/createSurvey" style={{ 
          color: '#f1356d', 
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px"   
        }}>New Survey</Link>

        <Link to="/createSurvey" style={{ 
          color: '#f1356d', 
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px",
          }}>New Question</Link>

        <Link to="/statistics" style={{ 
          color: '#f1356d', 
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px"   
        }}>Statistics</Link>
      </div>
     
         
       

      <div className="login">
        <Link to="/null" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px',
          fontSize: "18px",
          padding: "10px" 
        }}>Sign In</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;