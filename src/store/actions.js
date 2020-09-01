import axios from '../axios-quiz-builder';
import * as actionTypes from './actionTypes';

const createQuizSuccess = (id, data) => {
    return {
        type: actionTypes.CREATE_QUIZ_SUCCESS,
        id: id,
        data: data
    };
};

export const createQuiz = (data) => {
    return dispatch => {
        //dispatch(createQuizStart());

        axios.post("/quizzes.json", data)
            .then(response => {
                dispatch(createQuizSuccess(response.data.name, data));
            })
            .catch(error => {
                console.log(error);
            });
    }
};