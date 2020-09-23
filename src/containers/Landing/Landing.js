import React, { useState, useEffect } from 'react';
import axios from '../../axios-quiz-builder';
import { Link } from 'react-router-dom';

import QuizList from '../../components/QuizList/QuizList';

const Landing = () => {
    const [quizList, setQuizList] = useState(null);

    useEffect(() => {
        fetchQuizzesHandler();
    }, []);

    const fetchQuizzesHandler = () => {
        axios.get("/quizzes.json")
            .then(response => {
                setQuizList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    let content = "Loading...";
    if (quizList) {
        content = <QuizList quizzes={quizList} />;
    }

    return (
        <div>
            <h1 className="page-title">Quiz Builder</h1>
            {content}
            <Link 
                to="/quiz/create" 
                className="btn btn-primary btn-sm float-right">
                <i className="fa fa-plus mr-2"></i>
                Create Quiz
            </Link>
        </div>
    );
}

export default Landing;