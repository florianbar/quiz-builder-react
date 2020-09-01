import React from 'react';

import Answers from './Answers/Answers';

const question = props => {
    return (
        <div className="card mb-3">
            <h6 className="card-header">
                Question {props.questionIndex + 1}
            </h6>

            <div className="card-body">
                <div className="form-group row">
                    <label htmlFor="question1-title" className="col-sm-3 col-form-label">Title:</label>
                    <div className="col-auto">
                        <textarea 
                            className="form-control" 
                            id="question1-title" 
                            name="title" 
                            value={props.title} />
                    </div>
                </div>

                <Answers questionIndex={props.questionIndex} answers={props.answers} correct={props.correct} />
            </div>
        </div>
    );
};

export default question;