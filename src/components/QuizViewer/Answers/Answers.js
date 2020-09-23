import React, { useContext } from 'react';

import { QuizViewerContext } from '../../../context/quizviewer-context';

const Answers = props => {
    const checkAnswerHandler = useContext(QuizViewerContext).checkAnswerHandler;
    const selectAnswerHandler = useContext(QuizViewerContext).selectAnswerHandler;

    const answersList = props.answers.map((item, index) => {
        let answerClasses = "";
                
        if (props.hasSelectedAnswer) {
            if (index === props.selectedAnswer) {
                if (checkAnswerHandler(index)) {
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
                onClick={() => props.hasSelectedAnswer ? null : selectAnswerHandler(index)}>
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

export default Answers;