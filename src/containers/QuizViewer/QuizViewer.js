import React, { Component } from 'react';
import axios from '../../axios-quiz-builder';

import Answers from '../../components/QuizViewer/Answers/Answers';
import ValidationMessage from '../../components/QuizViewer/ValidationMessage/ValidationMessage';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';

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

    finishQuizHandler = () => {
        this.props.history.push("/");
    }

    render () {
        let quiz = <div>Loading...</div>;

        if (this.state.quiz) {
            const pageCount = this.state.quiz.questions.length;
            let pageContent = null;

            if (this.state.page < pageCount) {
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
                        <Button
                            btntype="success"
                            btnsize="lg"
                            clicked={this.nextQuestionHandler}
                            className="float-right">
                            Next
                        </Button>
                    );
                }

                pageContent = (
                    <React.Fragment>
                        <ProgressBar total={pageCount} value={this.state.page} />
                        <h4 className="mb-0">Question {this.state.page + 1}:</h4>
                        <h3 className="display-4" style={{fontSize: "2.5em"}}>{question.title}</h3>
                        <div className="mb-3">
                            <Answers 
                                answers={question.answers}
                                selectedAnswer={parseInt(this.state.selectedAnswer)}
                                hasSelectedAnswer={hasSelectedAnswer}
                                selectAnswer={this.selectAnswerHandler}
                                checkAnswer={this.checkAnswerHandler} />
                        </div>
                        {validationMessage}
                        <div className="clearfix mb-3">
                            {nextButton}
                        </div>
                    </React.Fragment>
                );
            } 
            else {
                const scoreInPercentage = 100 / pageCount * this.state.score;
                pageContent = (
                    <React.Fragment>
                        <h3 className="display-4" style={{fontSize: "2.5em"}}>
                            Your Score: {scoreInPercentage}%
                        </h3>
                        <div className="clearfix mb-3">
                            <Button
                                btntype="success"
                                btnsize="lg"
                                clicked={this.finishQuizHandler}
                                className="float-right">
                                Finish Quiz
                            </Button>
                        </div>
                    </React.Fragment>
                );
            }

            quiz = (
                <React.Fragment>
                    <h1 className="page-title">{this.state.quiz.name}</h1>
                    {pageContent}
                </React.Fragment>
            );
        }

        return quiz;
    }
};

export default QuizViewer;