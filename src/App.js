import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SurveyList from "./components/surveyComponents/SurveyList";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound"
import EditSurvey from "./components/surveyComponents/EditSurvey";
import HomePage from "./components/HomePage"
import CreateSurvey from "./components/surveyComponents/CreateSurvey";
import SurveyPage from "./components/surveyComponents/SurveyPage"
import StatisticsList from "./components/statisticsComponents/StatisticsList";
import StatisticsBySurvey from "./components/statisticsComponents/StatisticsBySurvey";
import BySurveyStatisticsList from "./components/statisticsComponents/BySurveyStatisticsList";
import StatisticsByUser from "./components/statisticsComponents/StatisticsByUser"
import ByUserStatisticsList from "./components/statisticsComponents/ByUserStatisticsList"
import Login from "./components/LoginComponent";



function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/surveyList">
              <SurveyList />
            </Route>
            <Route path="/survey/:id/:respondentName">
              <SurveyPage />
            </Route>
            <Route path="/createSurvey">
              <CreateSurvey />
            </Route>
            <Route path="/editSurvey/:id">
              <EditSurvey />
            </Route>
            <Route path="/statisticsList">
              <StatisticsList />
            </Route>
            <Route path="/bySurveyStatisticsPage">
              <BySurveyStatisticsList />
            </Route>
            <Route path="/byUserStatisticsPage">
              <ByUserStatisticsList />
            </Route>
            <Route path="/statisticsBySurvey/:id">
              <StatisticsBySurvey />
            </Route>
            <Route path="/statisticsByUser/:id">
              <StatisticsByUser />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router >
  )
}
export default App;
