import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts"
import authService from "../../services/auth.service";
import Card from "../Card";


const chartColors = [
    "#7FFFD4",
    "#B0E0E6",
    "#5F9EA0",
    "#4682B4",
    "#6495ED",
    "#00BFFF",
    "#1E90FF",
    "#ADD8E6",
    "#87CEEB",
    "#87CEFA",
]


const API_URL = "http://localhost:8080/apisurveys/"



const StatisticsBySurvey = () => {
    const { id } = useParams()
    const user = authService.getCurrentUser();


    const [data, setData] = useState([]);
    const [surveyDesc, setSurveyDesc] = useState([]);
    const radioQuestions = []
    const openQuestions = []
    const radioAnswers = []
    const openAnswers = []

    useEffect(() => getSurveys(API_URL, id), []);

    const getSurveys = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setData(data.questions)
                setSurveyDesc(data.surveyDesc)

            })

    }

    const setRadioAnswers = () => {
        let oneQuestionAnswers = []

        for (let z = 0; z < data.length; z++) {
            if (data[z].questionType === "radio-button question") {
                for (let i = 0; i < 3; i++) {
                    oneQuestionAnswers.push({
                        answer: data[z].answers[i].answer, number: data[z].answers[i].userAnswers.length
                    })
                }
                radioAnswers.push(oneQuestionAnswers)
                oneQuestionAnswers = []
            }
        }
    }

    const setOpenAnswers = () => {
        let oneQuestionAnswers = []

        for (let z = 0; z < data.length; z++) {
            if (data[z].questionType === "open question") {
                for (let i = 0; i < data[z].openUserAnswers.length; i++) {
                    oneQuestionAnswers.push(
                        data[z].openUserAnswers[i].answerText
                    )
                }

                openAnswers.push(oneQuestionAnswers)
                oneQuestionAnswers = []
            }
        }
    }

    const setQuestions = () => {
        for (let z = 0; z < data.length; z++) {
            if (data[z].questionType === "radio-button question") {
                radioQuestions.push(data[z].question)
            } else {
                openQuestions.push(data[z].question)
            }
        }
    }

    setRadioAnswers()
    setQuestions()
    setOpenAnswers()


    return (
        <div>
            {user ? (
                <>
                    <Typography style={{ color: "#ff004c", paddingLeft: 50, paddingBottom: 10 }} variant="h4">{surveyDesc}</Typography>
                    {radioAnswers.map((answer, index) => (
                        <Card styles={{ margin: 10 }}>
                            <Typography variant="h6">{radioQuestions[index]}</Typography>
                            <PieChart width={730} height={250}>
                                <Pie data={answer} nameKey="answer" dataKey="number" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" >
                                    {answer.map((entry, index2) => (
                                        <Cell key={`cell-${index2}`} fill={chartColors[index2]} /> // ??????????????????????????????????????
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </Card>
                    ))}
                    {openAnswers.map((answer, index) => (
                        <Card styles={{ margin: 10 }}>
                            <Typography style={{ paddingBottom: 10 }} variant="h6">{openQuestions[index]}</Typography>
                            {answer.map((a) => (
                                <li style={{ fontSize: 18 }}>{a}</li>
                            ))}
                        </Card>
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

export default StatisticsBySurvey;