import React from 'react';

import Answer from './Answer/Answer';

const question = props => {
    const answers = props.answers.map((item, index) => {
        return (
            <Answer 
                key={index} 
                questionIndex={props.questionIndex}
                answerIndex={index}
                answer={item}
                correctAnswer={props.correctAnswer}
                questionPropertyChanged={props.questionPropertyChanged}
                answerChanged={props.answerChanged}
                removeAnswer={() => props.removeAnswer(props.questionIndex, index)} />
        );
    });

    const questionIndexString = "question" + props.questionIndex;

    return (
        <div className="card mb-3">
            <h5 className="card-header">
                Question {props.questionIndex + 1}

                <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={props.removeQuestion}>
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
                            onChange={event => props.questionPropertyChanged(event, props.questionIndex, "title")}></textarea>
                    </div>
                </div>

                <div>
                    {answers}
                    
                    <button 
                        className="btn btn-primary btn-sm float-right"
                        onClick={() => props.addAnswer(props.questionIndex)}>
                        <i className="fa fa-plus mr-2"></i>
                        Add Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default question;