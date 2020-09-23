import React, { useState, useEffect } from 'react';
import axios from '../../axios-quiz-builder';

import Answers from '../../components/QuizViewer/Answers/Answers';
import ValidationMessage from '../../components/QuizViewer/ValidationMessage/ValidationMessage';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';

const QuizViewer = props => {
    const [quiz, setQuiz] = useState(null);
    const [page, setPage] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const id = props.match.params.id
        axios.get(`/quizzes/${id}.json`)
            .then(response => {
                setQuiz(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.match.params.id]);

    const checkAnswerHandler = index => {
        const correctAnswer = quiz.questions[page].correctAnswer;
        return parseInt(index) === parseInt(correctAnswer);
    };

    const selectAnswerHandler = (index) => {
        let updatedScore = score;
        if (checkAnswerHandler(index)) {
            updatedScore += 1; 
        }
        setSelectedAnswer(index);
        setScore(updatedScore);
    };

    const nextQuestionHandler = () => {
        const updatedPage = page + 1;
        setSelectedAnswer(null);
        setPage(updatedPage);
    };

    const finishQuizHandler = () => {
        props.history.push("/");
    };

    let content = <div>Loading...</div>;

    if (quiz) {
        const pageCount = quiz.questions.length;
        let pageContent = null;

        if (page < pageCount) {
            const question = quiz.questions[page];
            const hasSelectedAnswer = selectedAnswer !== null;

            let validationMessage = null;
            let nextButton = null;
            if (hasSelectedAnswer) {
                validationMessage = (
                    <ValidationMessage 
                        isCorrect={checkAnswerHandler(selectedAnswer)} 
                        correctAnswer={question.answers[question.correctAnswer]} />
                );

                nextButton = (
                    <Button
                        btntype="success"
                        btnsize="lg"
                        clicked={nextQuestionHandler}
                        className="float-right">
                        Next
                    </Button>
                );
            }

            pageContent = (
                <React.Fragment>
                    <ProgressBar total={pageCount} value={page} />
                    <h4 className="mb-0">Question {page + 1}:</h4>
                    <h3 className="display-4" style={{fontSize: "2.5em"}}>{question.title}</h3>
                    <div className="mb-3">
                        <Answers 
                            answers={question.answers}
                            selectedAnswer={parseInt(selectedAnswer)}
                            hasSelectedAnswer={hasSelectedAnswer}
                            selectAnswer={selectAnswerHandler}
                            checkAnswer={checkAnswerHandler} />
                    </div>
                    {validationMessage}
                    <div className="clearfix mb-3">
                        {nextButton}
                    </div>
                </React.Fragment>
            );
        } 
        else {
            const scoreInPercentage = 100 / pageCount * score;
            pageContent = (
                <React.Fragment>
                    <h3 className="display-4" style={{fontSize: "2.5em"}}>
                        Your Score: {scoreInPercentage}%
                    </h3>
                    <div className="clearfix mb-3">
                        <Button
                            btntype="success"
                            btnsize="lg"
                            clicked={finishQuizHandler}
                            className="float-right">
                            Finish Quiz
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        content = (
            <React.Fragment>
                <h1 className="page-title">{quiz.name}</h1>
                {pageContent}
            </React.Fragment>
        );
    }

    return content;
};

export default QuizViewer;