import React, { useEffect, useContext } from 'react';

import { QuizViewerContext } from '../../context/quizviewer-context';
import Answers from '../../components/QuizViewer/Answers/Answers';
import ValidationMessage from '../../components/QuizViewer/ValidationMessage/ValidationMessage';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';

const QuizViewer = props => {
    const quiz = useContext(QuizViewerContext).quiz;
    const page = useContext(QuizViewerContext).page;
    const selectedAnswer = useContext(QuizViewerContext).selectedAnswer;
    const score = useContext(QuizViewerContext).score;
    const initHandler = useContext(QuizViewerContext).initHandler;
    const checkAnswerHandler = useContext(QuizViewerContext).checkAnswerHandler;
    const nextQuestionHandler = useContext(QuizViewerContext).nextQuestionHandler;
    const finishQuizHandler = useContext(QuizViewerContext).finishQuizHandler;

    useEffect(() => {
        initHandler();
    }, [initHandler]);

    let content = <div>Loading...</div>;

    if (quiz) {
        const pageCount = quiz.questions.length;
        let pageContent = null;

        if (page < pageCount) {
            const question = quiz.questions[page];
            const hasSelectedAnswer = selectedAnswer !== null;

            let validationMessage = null;
            let nextButton = null;
            if (hasSelectedAnswer) {
                validationMessage = (
                    <ValidationMessage 
                        isCorrect={checkAnswerHandler(selectedAnswer)} 
                        correctAnswer={question.answers[question.correctAnswer]} />
                );

                nextButton = (
                    <Button
                        btntype="success"
                        btnsize="lg"
                        clicked={nextQuestionHandler}
                        className="float-right">
                        Next
                    </Button>
                );
            }

            pageContent = (
                <React.Fragment>
                    <ProgressBar total={pageCount} value={page} />
                    <h4 className="mb-0">Question {page + 1}:</h4>
                    <h3 className="display-4" style={{fontSize: "2.5em"}}>{question.title}</h3>
                    <div className="mb-3">
                        <Answers 
                            answers={question.answers}
                            selectedAnswer={parseInt(selectedAnswer)}
                            hasSelectedAnswer={hasSelectedAnswer} />
                    </div>
                    {validationMessage}
                    <div className="clearfix mb-3">
                        {nextButton}
                    </div>
                </React.Fragment>
            );
        } 
        else {
            const scoreInPercentage = 100 / pageCount * score;
            pageContent = (
                <React.Fragment>
                    <h3 className="display-4" style={{fontSize: "2.5em"}}>
                        Your Score: {scoreInPercentage}%
                    </h3>
                    <div className="clearfix mb-3">
                        <Button
                            btntype="success"
                            btnsize="lg"
                            clicked={finishQuizHandler}
                            className="float-right">
                            Finish Quiz
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        content = (
            <React.Fragment>
                <h1 className="page-title">{quiz.name}</h1>
                {pageContent}
            </React.Fragment>
        );
    }

    return content;
};

export default QuizViewer;