import React, { useState, useEffect } from "react"

import SurveyPage from "./components/SurveyPage";
import QuestionPage from "./components/QuestionPage"

import Navbar from "./components/Navbar";
import NotFound from "./NotFound"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditSurvey from "./components/EditSurvey";
import HomePage from "./HomePage"


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
              <SurveyPage />
            </Route>
            {/* <Route path="/create">
              <Create />
            </Route> */}
            <Route path="/survey/:id">
              <QuestionPage />
            </Route>
            {/* <Route path="/createSurvey">
              <QuestionPage />
            </Route> */}
            <Route path="/editSurvey/:id">
              <EditSurvey />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )}
export default App;
