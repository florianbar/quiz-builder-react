import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Question from '../../components/Quiz/Question/Question';

const initialQuestionSetup = {
    title: "",
    answers: [ "", "" ],
    correctAnswer: 0
};

class QuizBuilder extends Component {
    state = {
        name: "",
        questions: []
    }

    componentDidMount () {
        this.addQuestionHandler();
    }

    nameChangedHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    questionPropertyChangedHandler = (event, questionIndex, property) => {
        // used for "title" and "correctAnswer"
        const updatedQuestions = [ ...this.state.questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex][property] = event.target.value;
        this.setState({ questions: updatedQuestions });
    }

    answerChangedHandler = (event, questionIndex, answerIndex) => {
        const updatedQuestions = [ ...this.state.questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        const updatedAnswers = [ ...updatedQuestion.answers ];
        updatedAnswers[answerIndex] = event.target.value;
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex].answers = updatedAnswers;
        this.setState({ questions: updatedQuestions });
    }

    addAnswerHandler = (questionIndex) => {
        const updatedQuestions = [ ...this.state.questions ];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.concat("");
        this.setState({ questions: updatedQuestions });
    }

    removeAnswerHandler = (questionIndex, answerIndex) => {
        const updatedQuestions = [ ...this.state.questions ];

        // update the correct answer
        let updatedCorrectAnswer = parseInt(this.state.questions[questionIndex].correctAnswer);
        if (parseInt(answerIndex) === updatedCorrectAnswer) {
            updatedCorrectAnswer = 0;
        } else if (parseInt(answerIndex) < updatedCorrectAnswer) {
            updatedCorrectAnswer = updatedCorrectAnswer - 1;
        }

        const updatedQuestion = { 
            ...this.state.questions[questionIndex],  
            answers: [...this.state.questions[questionIndex].answers].filter((item, index) => index !== answerIndex),
            correctAnswer: updatedCorrectAnswer
        };
        updatedQuestions[questionIndex] = updatedQuestion;
        this.setState({ questions: updatedQuestions });
    }

    addQuestionHandler = () => {
        const newQuestion = { ...initialQuestionSetup };
        const updatedQuestions = [ ...this.state.questions ].concat(newQuestion);
        this.setState({ questions: updatedQuestions });
    }

    removeQuestionHandler = (questionIndex) => {
        console.log("[removeQuestionHandler]", questionIndex);
        const updatedQuestions = this.state.questions.filter((item, index) => index !== questionIndex);
        this.setState({ questions: updatedQuestions });
    }

    render () {
        const questions = this.state.questions.map((item, index) => {
            return (
                <Question 
                    key={index}
                    questionIndex={index}
                    title={item.title} 
                    answers={item.answers} 
                    correctAnswer={item.correctAnswer}
                    questionPropertyChanged={this.questionPropertyChangedHandler}
                    answerChanged={this.answerChangedHandler}
                    addAnswer={this.addAnswerHandler}
                    removeAnswer={this.removeAnswerHandler}
                    removeQuestion={() => this.removeQuestionHandler(index)} />
            );
        });

        return (
            <div>
                <h1>Quiz Builder</h1>

                <div className="form-group">
                    <label htmlFor="name">Quiz Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.nameChangedHandler} />
                </div>

                {questions}

                <div className="clearfix mb-3">
                    <button 
                        className="btn btn-primary btn-sm float-right"
                        onClick={this.addQuestionHandler}>
                        <i className="fa fa-plus mr-2"></i>
                        Add Question
                    </button>
                </div>

                <hr />
                
                <button 
                    className="btn btn-success btn-lg float-right"
                    onClick={() => this.props.createQuizHandler(this.state)}>
                    <i className="fa fa-check mr-2"></i>
                    Save Quiz
                </button>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createQuizHandler: (quiz) => dispatch(actions.createQuiz(quiz))
    };
};

export default connect(null, mapDispatchToProps)(QuizBuilder);