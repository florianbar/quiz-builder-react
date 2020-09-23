import React, { useState } from 'react';
import axios from '../../axios-quiz-builder';

import Question from '../../components/QuizBuilder/Question/Question';

const initialQuestionSetup = {
    title: "",
    answers: [ "", "" ],
    correctAnswer: 0
};

const QuizBuilder = props => {
    const [name, setName] = useState("");
    const [questions, setQuestions] = useState([initialQuestionSetup]);

    const addQuestionHandler = () => {
        console.log("addQuestionHandler");
        const newQuestion = { ...initialQuestionSetup };
        const updatedQuestions = [ ...questions ].concat(newQuestion);
        setQuestions(updatedQuestions);
    };

    const nameChangedHandler = (event) => {
        setName(event.target.value);
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

    const questionContent = questions.map((item, index) => {
        return (
            <Question 
                key={index}
                questionIndex={index}
                title={item.title} 
                answers={item.answers} 
                correctAnswer={item.correctAnswer}
                questionPropertyChanged={questionPropertyChangedHandler}
                answerChanged={answerChangedHandler}
                addAnswer={addAnswerHandler}
                removeAnswer={removeAnswerHandler}
                removeQuestion={() => removeQuestionHandler(index)} />
        );
    });

    return (
        <div>
            <h1 className="page-title">Let's Get Started!</h1>

            <div className="form-group row">
                <label 
                    className="col-sm-3 col-form-label" 
                    htmlFor="name">Quiz Name:</label>
                <div className="col">
                    <input 
                        className="form-control" 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                        onChange={nameChangedHandler} />
                </div>
            </div>

            {questionContent}

            <div className="clearfix mb-3">
                <button 
                    className="btn btn-primary btn-sm float-right"
                    onClick={addQuestionHandler}>
                    <i className="fa fa-plus mr-2"></i>
                    Add Question
                </button>
            </div>

            <hr />
            
            <button 
                className="btn btn-success btn-lg float-right"
                onClick={createQuizHandler}>
                <i className="fa fa-check mr-2"></i>
                Create Quiz
            </button>
        </div>
    );
};

export default QuizBuilder;