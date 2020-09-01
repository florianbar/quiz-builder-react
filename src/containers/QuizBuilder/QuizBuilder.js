import React, { Component } from 'react';

class QuizBuilder extends Component {
    state = {
        name: "Math Quiz",
        questions: [
            { 
                question: "5 + 5 = ?",
                choices: [ 20, 15, 10, 5 ],
                answerIndex: 2
            },
            {
                question: "10 x 2 = ?",
                choices: [ 20, 15, 10, 5 ],
                answerIndex: 0
            },
            {
                question: "50 - 3 = ?",
                choices: [ 20, 15, 10, 47 ],
                answerIndex: 3
            }
        ]
    }

    render () {
        return (
            <div>
                <h1>Quiz Builder</h1>

                <div className="form-group">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" id="name" name="name" />
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Question 1</h5>

                        <div className="form-group row">
                            <label for="question1-question" className="col-sm-3 col-form-label">Question:</label>
                            <div className="col-auto">
                                <textarea className="form-control" id="question1-question" name="question"></textarea>
                            </div>
                        </div>

                        <div className="form-group form-row align-items-center">
                            <label for="question1-answer1" className="col-3 col-form-label">Answer 1:</label>
                            <div className="col">
                                <input type="text" className="form-control" id="question1-answer1" name="answer1" />
                            </div>
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" name="question1-answers" type="radio" id="question1-answers-answer1" />
                                    <label className="form-check-label" for="question1-answers-answer1"></label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group form-row align-items-center">
                            <label for="question1-answer2" className="col-3 col-form-label">Answer 1:</label>
                            <div className="col">
                                <input type="text" className="form-control" id="question1-answer2" />
                            </div>
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" name="question1-answers" type="radio" id="question1-answers-answer2" />
                                    <label className="form-check-label" for="question1-answers-answer2"></label>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-sm float-right">Add Answer</button>
                    </div>
                </div>

                
            </div>
        );
    }
}

export default QuizBuilder;