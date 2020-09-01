import React from 'react';

import Question from './Question/Question';

const questions = props => {
    const questions = props.questions.map((item, index) => {
        return (
            <Question 
                key={index}
                questionIndex={index}
                title={item.title} 
                answers={item.answers} 
                correct={item.correct} />
        );
    });

    return (
        <React.Fragment>
            {questions}
        </React.Fragment>
    );
};

export default questions;