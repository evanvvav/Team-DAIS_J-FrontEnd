import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts"
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

    const [data, setData] = useState([]);
    const radioQuestions = []
    const openQuestions = []
    const radioAnswers = []
    const openAnswers = [
        [1, 2, 3],
        [4, 5, 7]
    ]

    useEffect(() => getSurveys(API_URL, id), []);

    const getSurveys = (API_URL, id) => {
        fetch(API_URL + id)
            .then(res => res.json())
            .then(data => {
                setData(data.questions)

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


    console.log(data)
    console.log(radioAnswers)
    console.log(openAnswers)
    console.log(radioQuestions)
    console.log(openQuestions)

    return (
        <div >
            {radioAnswers.map((answer, index) => (
                <Card styles={{ margin: 10 }}>
                    <Typography variant="h6">{radioQuestions[index]}</Typography>
                    <PieChart width={730} height={250}>
                        <Pie data={answer} nameKey="answer" dataKey="number" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
                        {answer.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index]} /> // ??????????????????????????????????????
                        ))}
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </Card>
            ))}
            {openAnswers.map((answer, index) => (
                <Card styles={{ margin: 10 }}>
                    <Typography style={{ paddingBottom: 10 }} variant="h6">{openQuestions[index]}</Typography>
                    {answer.map((a) => (
                        <li>{a}</li>
                    ))}
                </Card>
            ))}

        </div>
    )
}

export default StatisticsBySurvey;