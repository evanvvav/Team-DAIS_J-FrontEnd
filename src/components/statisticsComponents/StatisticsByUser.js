import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts"
import authService from "../../services/auth.service";
import Card from "../Card";


const API_URL = "http://localhost:8080/apirespondents/"
const API_SURVEYS = "http://localhost:8080/apisurveys"



const StatisticsByUser = () => {
    const { id } = useParams()
    const user = authService.getCurrentUser();


    const [data, setData] = useState([])
    const [surveysData, setSurveysData] = useState([])
    const surveys = []



    useEffect(() => getUsers(API_URL, id), []);

    const getUsers = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setData(data)
                getSurveysDesc(API_SURVEYS)

            })
    }

    const getSurveysDesc = (API_SURVEYS) => {
        fetch(API_SURVEYS)
            .then(res => res.json())
            .then(data => setSurveysData(data))
    }

    const setSurvey = () => {
        let questionAndAnswers = []
        let answerText = ""
        let questionText = ""
        let surveyDesc = ""


        if (data) {

            for (let z = 0; z < surveysData.length; z++) {
                surveyDesc = surveysData[z].surveyDesc
                for (let i = 0; i < data.userAnswers.length; i++) {

                    if (data.userAnswers[i].answer.question.survey.surveyDesc === surveysData[z].surveyDesc) {
                        questionText = data.userAnswers[i].answer.question.question
                        answerText = data.userAnswers[i].answer.answer

                        questionAndAnswers.push({ question: questionText, answer: answerText })
                        answerText = ""
                        questionText = ""

                    }

                }

                for (let i = 0; i < data.openUserAnswers.length; i++) {

                    if (data.openUserAnswers[i].question.survey.surveyDesc === surveysData[z].surveyDesc) {
                        questionText = data.openUserAnswers[i].question.question
                        answerText = data.openUserAnswers[i].answerText

                        questionAndAnswers.push({ question: questionText, answer: answerText })
                        answerText = ""
                        questionText = ""
                    }
                }

                surveys.push({ survey: surveyDesc, questionAndAnswers })
                questionAndAnswers = []

            }

        }

    }


    setSurvey()




    return (
        <div style={{ fontSize: 20 }}>
            {user ? (
                <>
                    <Typography style={{ color: "black", paddingLeft: 50, paddingBottom: 10 }} variant="h4">{data.respondentName}</Typography>
                    {surveys.map((survey) => (
                        (survey.questionAndAnswers.length === 0 ? (
                            <div></div>
                        ) : (
                            <Card styles={{ margin: 10 }}>
                                <Typography style={{ paddingBottom: 20, color: "#ff004c" }} variant="h4">{survey.survey}</Typography>
                                {survey.questionAndAnswers.map((QaA) => (
                                    <div style={{ paddingLeft: 15, paddingBottom: 15 }}>
                                        <Typography style={{ paddingBottom: 5 }} variant="h6">{QaA.question}</Typography>
                                        <li>{QaA.answer}</li>
                                    </div>
                                ))}
                            </Card>

                        ))
                    ))}
                </>
            ) : (
                <div className="access-denied">
                    <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
                </div>
            )}
        </div>
    )
}

export default StatisticsByUser;