
import { Link } from "react-router-dom";
import Card from "../Card";



const StatisticsList = () => {

    return (
        <div>
            <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/bySurveyStatisticsPage`}
            >
                <Card styles={{ margin: 25 }} >
                    <h3>Statistics By Survey</h3>
                </Card>
            </Link>

            <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/byUserStatisticsPage`}

            >
                <Card styles={{ margin: 25 }} >
                    <h3>Statistics By User</h3>
                </Card>
            </Link>
        </div>
    )
}

export default StatisticsList;