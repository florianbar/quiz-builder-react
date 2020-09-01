import React from 'react';

import Answer from './Answer/Answer';

const answers = props => {
    const answers = props.answers.map((item, index) => {
        return (
            <Answer 
                key={index} 
                questionIndex={props.questionIndex}
                answerIndex={index}
                answer={item}
                isCorrect={props.correct === index} />
        );
    });

    return (
        <div>
            {answers}
            <button className="btn btn-primary btn-sm float-right">Add Answer</button>
        </div>
    );
};

export default answers;