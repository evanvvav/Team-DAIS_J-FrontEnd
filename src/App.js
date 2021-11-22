import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SurveyPage from "./components/surveyComponents/SurveyPage";
import QuestionPage from "./components/questionComponents/QuestionPage"

import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound"

import EditSurvey from "./components/surveyComponents/EditSurvey";
import HomePage from "./components/HomePage"
import useFetch from "./components/useFetch";
import CreateSurvey from "./components/surveyComponents/CreateSurvey";


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
            <Route path="/survey/:id">
              <QuestionPage />
            </Route>
            <Route path="/createSurvey">
              <CreateSurvey/>
            </Route>
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
