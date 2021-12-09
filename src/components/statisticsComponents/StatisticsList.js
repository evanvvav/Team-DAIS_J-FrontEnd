
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import Card from "../Card";



const StatisticsList = () => {
    const user = authService.getCurrentUser();


    return (
        <div>
            {user ? (
                <>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/bySurveyStatisticsPage`}
                    >
                        <Card styles={{ margin: 25 }} >
                            <h3 style={{ margin: 0, padding: 10 }}>Statistics By Survey</h3>
                        </Card>
                    </Link>

                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/byUserStatisticsPage`}

                    >
                        <Card styles={{ margin: 25 }} >
                            <h3 style={{ margin: 0, padding: 10 }}>Statistics By User</h3>
                        </Card>
                    </Link>
                </>
            ) : (
                <div className="access-denied">
                    <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
                </div>
            )}
        </div>
    )
}

export default StatisticsList;