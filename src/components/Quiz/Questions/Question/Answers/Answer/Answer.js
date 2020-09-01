import React from 'react';

const answer = props => {
    const questionIndexString = "question" + props.questionIndex;
    const answerIndexString = "answer" + props.answerIndex;
    
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
                    value={props.answer} />
            </div>

            <div className="col-auto">
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        checked={props.isCorrect}
                        type="radio" 
                        name={`${questionIndexString}-answers`} 
                        id={`${questionIndexString}-answers-${answerIndexString}`} />
                    <label 
                        className="form-check-label" 
                        htmlFor={`${questionIndexString}-answers-${answerIndexString}`}></label>
                </div>
            </div>

        </div>
    );
};

export default answer;