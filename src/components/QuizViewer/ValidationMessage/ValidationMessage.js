import React from 'react';

const validationMessage = (props) => {
    let message = (
        <div className="row no-gutters mb-3">
            <div className="col-auto">
                <i className="fa fa-times mr-2 text-danger"></i>
            </div>
            <div className="col font-weight-bold">
                <div className="text-danger">
                    That is incorrect.
                </div> 
                <div>
                    The correct answer is '{props.correctAnswer}'.
                </div> 
            </div>
        </div>
    );

    if (props.isCorrect) {
        message = (
            <div className="row no-gutters mb-3 text-success">
                <div className="col-auto">
                    <i className="fa fa-check mr-2"></i>
                </div>
                <div className="col font-weight-bold">
                    Well done! That is correct.
                </div>
            </div>
        );
    }

    return message;
};

export default validationMessage;