import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/"><h1>DAIS_J</h1></Link>
      <div className="links">
        <Link to="/surveyList">Surveys List</Link>
        <Link to="/createSurvey" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Survey</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;