import React from 'react';

const answer = props => {
    const questionIndexString = "question" + props.questionIndex;
    const answerIndexString = "answer" + props.answerIndex;

    const isCorrectAnswer = parseInt(props.correctAnswer) === parseInt(props.answerIndex);
    
    return (
        <div className="form-group form-row align-items-center">
            <label 
                htmlFor={`${questionIndexString}-${answerIndexString}`} 
                className="col-3 col-form-label">
                Answer {props.answerIndex + 1}:
            </label>
            <div className="col">
                <input 
                    type="text" 
                    className="form-control" 
                    id={`${questionIndexString}-${answerIndexString}`}
                    value={props.answer}
                    onChange={event => props.answerChanged(event, props.questionIndex, props.answerIndex)} />
            </div>

            <div className="col-auto">
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`${questionIndexString}-answers`} 
                        id={`${questionIndexString}-answers-${answerIndexString}`}
                        value={props.answerIndex}
                        checked={isCorrectAnswer}
                        onChange={event => props.questionPropertyChanged(event, props.questionIndex, "correctAnswer")} />
                    <label 
                        className="form-check-label" 
                        htmlFor={`${questionIndexString}-answers-${answerIndexString}`}></label>
                </div>
            </div>

            <div className="col-auto">
                <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={props.removeAnswer}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default answer;