import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SurveyList from "./components/surveyComponents/SurveyList";

import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound"

import EditSurvey from "./components/surveyComponents/EditSurvey";
import HomePage from "./components/HomePage"
import useFetch from "./components/useFetch";
import CreateSurvey from "./components/surveyComponents/CreateSurvey";
import SurveyPage from "./components/surveyComponents/SurveyPage"
import StatisticsList from "./components/statisticsComponents/StatisticsList";
import StatisticsBySurvey from "./components/statisticsComponents/StatisticsBySurvey";
import BySurveyStatisticsPage from "./components/statisticsComponents/BySurveyStatisticsPage";
import StatisticsByUser from "./components/statisticsComponents/StatisticsByUser"
import ByUserStatisticsPage from "./components/statisticsComponents/ByUserStatisticsPage"



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
            <Route path="/survey/:id/:userName">
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
              <BySurveyStatisticsPage />
            </Route>
            <Route path="/byUserStatisticsPage">
              <ByUserStatisticsPage />
            </Route>
            <Route path="/statisticsBySurvey/:id">
              <StatisticsBySurvey />
            </Route>
            <Route path="/statisticsByUser">
              <StatisticsByUser />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}
export default App;
