import React, { Component } from 'react';
import axios from '../../axios-quiz-builder';

class QuizViewer extends Component {
    state = {
        quiz: null,
        page: 0,
        score: 0,
        selectedAnswer: null
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
        this.setState({ 
            selectedAnswer: index
        });
    }

    render () {
        let quiz = (<div>Loading...</div>);
        if (this.state.quiz) {
            const pageNum = this.state.page + 1;
            const question = this.state.quiz.questions[this.state.page];
            const answers = question.answers.map((item, index) => {
                let answerClasses = "";
                const hasSelectedAnswer = this.state.selectedAnswer !== null;
                if (hasSelectedAnswer) {
                    if (index === parseInt(this.state.selectedAnswer)) {
                        if (this.checkAnswerHandler(index)) {
                            answerClasses = "list-group-item-success";
                        } else {
                            answerClasses = "list-group-item-danger";
                        }
                    } 
                }

                return (
                    <button
                        className={["list-group-item list-group-item-action", answerClasses].join(" ")}
                        key={index} 
                        onClick={() => this.selectAnswerHandler(index)}>
                        {item}
                    </button>
                );
            });
            quiz = (
                <div>
                    <h1 className="page-title">{this.state.quiz.name}</h1>

                    <h3>
                        Question {pageNum}:<br />
                        {question.title}
                    </h3>

                    <div className="list-group mb-3">
                        {answers}
                    </div>

                    <div className="row no-gutters mb-3">
                        <div className="col-auto">
                            <i className="fa fa-times mr-2 text-danger"></i>
                        </div>
                        <div className="col font-weight-bold">
                            <div className="text-danger">
                                That is incorrect.
                            </div> 
                            <div>
                                The correct answer is 12.
                            </div> 
                        </div>
                    </div>

                    <div className="row no-gutters mb-3 text-success">
                        <div className="col-auto">
                            <i className="fa fa-check mr-2"></i>
                        </div>
                        <div className="col font-weight-bold">
                            Well done! That is correct.
                        </div>
                    </div>

                    <hr />

                    <div className="clearfix">
                        <button 
                            className="btn btn-success btn-lg float-right"
                            onClick={null}>
                            Next Question
                            <i className="fa fa-chevron-right ml-2"></i>
                        </button>
                    </div>

                    <div>
                        Question {pageNum} of {this.state.quiz.questions.length}
                    </div>
                </div>
            );
        }

        return quiz;
    }
};

export default QuizViewer;