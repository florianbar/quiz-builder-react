import React from 'react';

import { Link } from 'react-router-dom';

const quizList = (props) => {
    const quizList = Object.keys(props.quizzes).map(id => {
        return (
            <Link
                key={id} 
                to={"/quiz?id=" + id} 
                className="list-group-item list-group-item-action">
                {props.quizzes[id].name}
            </Link>
        );
    });

    return (
        <div>
            <div className="list-group mb-3">
                {quizList}
            </div>
        </div>
    );
};

export default quizList;