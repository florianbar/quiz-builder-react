import React from 'react';

const answers = (props) => {
    const answersList = props.answers.map((item, index) => {
        let answerClasses = "";
                
        if (props.hasSelectedAnswer) {
            if (index === props.selectedAnswer) {
                if (props.checkAnswer(index)) {
                    answerClasses = "list-group-item-success";
                } else {
                    answerClasses = "list-group-item-danger";
                }
            } 
        }
        return (
            <button
                className={["list-group-item list-group-item-action", answerClasses].join(" ")}
                key={index} 
                onClick={() => props.hasSelectedAnswer ? null : props.selectAnswer(index)}>
                {item}
            </button>
        );
    });

    return (
        <div className="list-group">
            {answersList}
        </div>
    );
};

export default answers;