import { useState } from 'react';
import TestService from '../services/test.service';
import questions from '../data/questions';
//import Alert from '../components/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import pathnames from '../utils/pathnames';
import Question from '../components/Question.jsx';
import PageContainer from '../components/PageContainer';
import palette from '../utils/palette';

const useStyles = makeStyles((theme) => ({
    progressContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '100%',
            padding: '0 1em 1em 1em',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '75%',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            width: '60%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        },
    },
    progress: {
        width: '100%'
    }
}));

const TOTAL_QUESTIONS = 23;

function Test() {
    const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(-1));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const classes = useStyles();
    let history = useHistory();

    function saveAnswer(optionChosen) {
        let newAnswers = [...answers];
        newAnswers[currentQuestion] = optionChosen;
        setAnswers(newAnswers);
        nextQuestion();
    }

    function nextQuestion() {
        if (currentQuestion < TOTAL_QUESTIONS - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            console.log("finalizado")
        }
    }

    return (
        <PageContainer align="center" backgroundColor={palette.background}>
            <Question
                question={'Pregunta ' + (currentQuestion + 1)}
                optionA={questions[currentQuestion].optionA}
                optionB={questions[currentQuestion].optionB}
                saveAnswer={saveAnswer}
                final={currentQuestion === TOTAL_QUESTIONS - 1}
            />
            <div className={classes.progressContainer}>
                <LinearProgress
                    variant="determinate"
                    value={(currentQuestion + 1) * 100 / 23}
                    className={classes.progress}
                />
            </div>
        </PageContainer>
    )
}

export default Test;