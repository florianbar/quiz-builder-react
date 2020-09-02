import axios from '../axios-quiz-builder';
import * as actionTypes from './actionTypes';

const fetchQuizzesSuccess = (data) => {
    return {
        type: actionTypes.FETCH_QUIZZES_SUCCESS,
        data: data
    };
};

export const fetchQuizzes = () => {
    return dispatch => {
        axios.get("/quizzes.json")
            .then(response => {
                dispatch(fetchQuizzesSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
};