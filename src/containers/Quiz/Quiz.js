import React, { Component } from 'react';
import axios from '../../axios-quiz-builder';

class Quiz extends Component {
    state = {
        quiz: null
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

    render () {
        let quiz = (<div>Loading...</div>);
        if (this.state.quiz) {
            quiz = (
                <div>
                    <h1 className="page-title">{this.state.quiz.name}</h1>
                </div>
            );
        }

        return quiz;
    }
};

export default Quiz;