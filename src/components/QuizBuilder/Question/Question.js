import React, { useContext } from 'react';

import { QuizBuilderContext } from '../../../context/quizbuilder-context';
import Answer from './Answer/Answer';
import classes from './Question.module.css';

const Question = props => {
    const removeQuestionHandler = useContext(QuizBuilderContext).removeQuestionHandler;
    const addAnswerHandler = useContext(QuizBuilderContext).addAnswerHandler;
    const questionPropertyChangedHandler = useContext(QuizBuilderContext).questionPropertyChangedHandler;

    const answers = props.answers.map((item, index) => {
        return (
            <Answer 
                key={index} 
                questionIndex={props.questionIndex}
                answerIndex={index}
                answer={item}
                correctAnswer={props.correctAnswer}
            />
        );
    });

    const questionIndexString = "question" + props.questionIndex;

    return (
        <div className={[classes.Question, "card mb-4"].join(" ")}>
            <h5 className="card-header">
                Question {props.questionIndex + 1}

                <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => removeQuestionHandler(props.questionIndex)}>
                    <i className="fa fa-trash"></i>
                </button>
            </h5>

            <div className="card-body">
                <div className="form-group row">
                    <label 
                        htmlFor={`${questionIndexString}-title`} 
                        className="col-sm-3 col-form-label">Title:</label>
                    <div className="col">
                        <textarea 
                            className="form-control" 
                            id={`${questionIndexString}-title`}
                            name="title" 
                            value={props.title}
                            onChange={event => questionPropertyChangedHandler(event, props.questionIndex, "title")}></textarea>
                    </div>
                </div>

                {answers}

                <div className="form-group form-row align-items-center">
                    <label 
                        htmlFor={`${questionIndexString}-correct-answer`} 
                        className="col-3 col-form-label">
                        Correct Answer:
                    </label>
                    <div className="col">
                        <input 
                            type="text" 
                            readOnly 
                            className="form-control-plaintext" 
                            id={`${questionIndexString}-correct-answer`} 
                            value={props.correctAnswerString} />
                    </div>
                </div>

                <button 
                    className="btn btn-primary btn-sm float-right"
                    onClick={() => addAnswerHandler(props.questionIndex)}>
                    <i className="fa fa-plus mr-2"></i>
                    Add Answer
                </button>
            </div>
        </div>
    );
};

export default Question;