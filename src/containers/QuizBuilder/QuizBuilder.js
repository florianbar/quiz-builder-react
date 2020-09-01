import React, { Component } from 'react';

import Questions from '../../components/Quiz/Questions/Questions';

class QuizBuilder extends Component {
    state = {
        quiz: {
            name: "Math Quiz",
            questions: [
                { 
                    title: "5 + 5 = ?",
                    answers: [ 20, 15, 10, 5 ],
                    correct: 2
                },
                {
                    title: "10 x 2 = ?",
                    answers: [ 20, 15, 12, 5 ],
                    correct: 0
                }
            ]
        }
    }

    render () {
        return (
            <div>
                <h1>Quiz Builder</h1>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" id="name" name="name" value={this.state.quiz.name} />
                </div>

                <Questions questions={this.state.quiz.questions} />
            </div>
        );
    }
}

export default QuizBuilder;