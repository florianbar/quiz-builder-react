import React, { useState } from 'react';
import axios from '../axios-quiz-builder';

const initialQuestionSetup = {
    title: "",
    answers: [ "", "" ],
    correctAnswer: 0
};

export const QuizBuilderContext = React.createContext({
    name: "",
    questions: [],
    nameChangedHandler: (event) => {},
    addQuestionHandler: () => {},
    questionPropertyChangedHandler: (event, questionIndex, property) => {},
    answerChangedHandler: (event, questionIndex, answerIndex) => {},
    addAnswerHandler: (questionIndex) => {},
    removeAnswerHandler: (questionIndex, answerIndex) => {},
    removeQuestionHandler: (questionIndex) => {},
    createQuizHandler: () => {}
});

export default (props) => {
    const [name, setName] = useState("");
    const [questions, setQuestions] = useState([initialQuestionSetup]);

    const nameChangedHandler = (event) => {
        setName(event.target.value);
    };

    const addQuestionHandler = () => {
        const newQuestion = { ...initialQuestionSetup };
        const updatedQuestions = [ ...questions ].concat(newQuestion);
        setQuestions(updatedQuestions);
    };

    const questionPropertyChangedHandler = (event, questionIndex, property) => {
        // used for "title" and "correctAnswer"
        const updatedQuestions = [ ...questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex][property] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const answerChangedHandler = (event, questionIndex, answerIndex) => {
        const updatedQuestions = [ ...questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        const updatedAnswers = [ ...updatedQuestion.answers ];
        updatedAnswers[answerIndex] = event.target.value;
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex].answers = updatedAnswers;
        setQuestions(updatedQuestions);
    };

    const addAnswerHandler = (questionIndex) => {
        const updatedQuestions = [ ...questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.concat("");
        setQuestions(updatedQuestions);
    };

    const removeAnswerHandler = (questionIndex, answerIndex) => {
        const updatedQuestions = [ ...questions ];

        // update the correct answer
        let updatedCorrectAnswer = parseInt(questions[questionIndex].correctAnswer);
        if (parseInt(answerIndex) === updatedCorrectAnswer) {
            updatedCorrectAnswer = 0;
        } else if (parseInt(answerIndex) < updatedCorrectAnswer) {
            updatedCorrectAnswer = updatedCorrectAnswer - 1;
        }

        const updatedQuestion = { 
            ...questions[questionIndex],  
            answers: [...questions[questionIndex].answers].filter((item, index) => index !== answerIndex),
            correctAnswer: updatedCorrectAnswer
        };
        updatedQuestions[questionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const removeQuestionHandler = (questionIndex) => {
        console.log("[removeQuestionHandler]", questionIndex);
        const updatedQuestions = questions.filter((item, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    const createQuizHandler = () => {  
        axios.post("/quizzes.json", {name: name, questions: questions})
            .then(() => {
                props.history.replace("/");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <QuizBuilderContext.Provider value={{
            name: name, 
            questions: questions,
            nameChangedHandler: nameChangedHandler,
            addQuestionHandler: addQuestionHandler,
            questionPropertyChangedHandler: questionPropertyChangedHandler,
            answerChangedHandler: answerChangedHandler,
            addAnswerHandler: addAnswerHandler,
            removeAnswerHandler: removeAnswerHandler,
            removeQuestionHandler: removeQuestionHandler,
            createQuizHandler: createQuizHandler
        }}>
            {props.children}
        </QuizBuilderContext.Provider>
    );
};