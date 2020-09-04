import React, { Component } from 'react';
import axios from '../../axios-quiz-builder';

import Answers from '../../components/QuizViewer/Answers/Answers';
import ProgressBar from '../../components/QuizViewer/ProgressBar/ProgressBar';
import ValidationMessage from '../../components/QuizViewer/ValidationMessage/ValidationMessage';

class QuizViewer extends Component {
    state = {
        quiz: null,
        page: 0,
        selectedAnswer: null,
        score: 0
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/quizzes/${id}.json`)
            .then(response => {
                this.setState({ quiz: response.data });
                console.log(this.state.quiz);
            })
            .catch(error => {
                console.log(error);
            });
    }

    checkAnswerHandler = (index) => {
        const correctAnswer = this.state.quiz.questions[this.state.page].correctAnswer;
        return parseInt(index) === parseInt(correctAnswer);
    }

    selectAnswerHandler = (index) => {
        let updatedScore = this.state.score;
        if (this.checkAnswerHandler(index)) {
            updatedScore += 1; 
        }
        this.setState({ 
            selectedAnswer: index,
            score: updatedScore
        });
    }

    nextQuestionHandler = () => {
        const updatedPage = this.state.page + 1;
        this.setState({ 
            selectedAnswer: null,
            page: updatedPage
        });
    }

    render () {
        let quiz = <div>Loading...</div>;

        if (this.state.quiz) {
            const question = this.state.quiz.questions[this.state.page];
            const hasSelectedAnswer = this.state.selectedAnswer !== null;

            let validationMessage = null;
            let nextButton = null;
            if (hasSelectedAnswer) {
                validationMessage = (
                    <ValidationMessage 
                        isCorrect={this.checkAnswerHandler(this.state.selectedAnswer)} 
                        correctAnswer={question.answers[question.correctAnswer]} />
                );
                nextButton = (
                    <div className="clearfix mb-3">
                        <button 
                            className="btn btn-success btn-lg float-right"
                            onClick={this.nextQuestionHandler}>
                            Next Question
                            <i className="fa fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                );
            }

            quiz = (
                <div>
                    <h1 className="page-title">{this.state.quiz.name}</h1>

                    Score: {this.state.score}/{this.state.quiz.questions.length} 

                    <ProgressBar 
                        pageCount={this.state.quiz.questions.length}
                        currentPage={this.state.page} />

                    <h4 className="mb-0">Question {this.state.page + 1}:</h4>
                    <h3 
                        className="display-4" 
                        style={{fontSize: "2.5em"}}>{question.title}</h3>

                    <div className="mb-3">
                        <Answers 
                            answers={question.answers}
                            selectedAnswer={parseInt(this.state.selectedAnswer)}
                            hasSelectedAnswer={hasSelectedAnswer}
                            selectAnswer={this.selectAnswerHandler}
                            checkAnswer={this.checkAnswerHandler} />
                    </div>

                    {validationMessage}
                    {nextButton}
                </div>
            );
        }

        return quiz;
    }
};

export default QuizViewer;