import React, { useContext } from 'react';

import { QuizBuilderContext } from '../../context/quizbuilder-context';
import Question from '../../components/QuizBuilder/Question/Question';

const QuizBuilder = props => {
    const name = useContext(QuizBuilderContext).name;
    const questions = useContext(QuizBuilderContext).questions;
    const nameChangedHandler = useContext(QuizBuilderContext).nameChangedHandler;
    const addQuestionHandler = useContext(QuizBuilderContext).addQuestionHandler;
    const createQuizHandler = useContext(QuizBuilderContext).createQuizHandler;

    const questionContent = questions.map((item, index) => {
        return (
            <Question 
                key={index}
                questionIndex={index}
                title={item.title} 
                answers={item.answers} 
                correctAnswer={item.correctAnswer} />
        );
    });

    return (
        <React.Fragment>
            <h1 className="page-title">Let's Get Started!</h1>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="name">Quiz Name:</label>
                <div className="col">
                    <input 
                        className="form-control" 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                        onChange={event => nameChangedHandler(event)} />
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
        </React.Fragment>
    );
};

export default QuizBuilder;