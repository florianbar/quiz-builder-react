import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import QuizList from '../../components/Quiz/QuizList/QuizList';

class Landing extends Component {
    componentDidMount () {
        this.props.fetchQuizzesHandler();
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Quiz Builder</h1>
                <QuizList quizzes={this.props.quizzes} />
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

const mapStateToProps = state => {
    return {
        quizzes: state.quizzes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizzesHandler: () => dispatch(actions.fetchQuizzes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);