import React, { useState, useCallback } from 'react';
import axios from '../axios-quiz-builder';

export const QuizViewerContext = React.createContext({
    quiz: null,
    page: 0,
    selectedAnswer: null,
    score: 0,
    initHandler: () => {},
    checkAnswerHandler: (index) => {},
    selectAnswerHandler: (index) => {},
    nextQuestionHandler: () => {},
    finishQuizHandler: () => {}
});

export default (props) => {
    const [quiz, setQuiz] = useState(null);
    const [page, setPage] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    const initHandler = useCallback(() => {
        axios.get(`/quizzes/${props.match.params.id}.json`)
            .then(response => {
                setQuiz(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setQuiz, props.match.params.id]);

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

    return (
        <QuizViewerContext.Provider value={{
            quiz: quiz,
            page: page,
            selectedAnswer: selectedAnswer,
            score: score,
            initHandler: initHandler,
            checkAnswerHandler: checkAnswerHandler,
            selectAnswerHandler: selectAnswerHandler,
            nextQuestionHandler: nextQuestionHandler,
            finishQuizHandler: finishQuizHandler
        }}>
            {props.children}
        </QuizViewerContext.Provider>
    );
};