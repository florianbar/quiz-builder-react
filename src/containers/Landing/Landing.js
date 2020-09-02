import React, { Component } from 'react';
import axios from '../../axios-quiz-builder';
import { Link } from 'react-router-dom';

import QuizList from '../../components/Quiz/QuizList/QuizList';

class Landing extends Component {
    state = {
        quizzes: null
    };

    componentDidMount () {
        this.fetchQuizzesHandler();
    }

    fetchQuizzesHandler = () => {
        axios.get("/quizzes.json")
            .then(response => {
                this.setState({ quizzes: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let quizList = "Loading...";
        if (this.state.quizzes) {
            quizList = <QuizList quizzes={this.state.quizzes} />;
        }

        return (
            <div>
                <h1 className="page-title">Quiz Builder</h1>
                {quizList}
                <Link 
                    to="/quiz/create" 
                    className="btn btn-primary btn-sm float-right">
                    <i className="fa fa-plus mr-2"></i>
                    Create Quiz
                </Link>
            </div>
        );
    };
}

export default Landing;