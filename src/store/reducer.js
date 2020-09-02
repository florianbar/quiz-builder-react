import * as actionTypes from './actionTypes';

const initialState = {
    quizzes: {}
};

const fetchQuizzesSuccess = (state, action) => {
    return {
        ...state,
        quizzes: action.data
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_QUIZZES_SUCCESS: return fetchQuizzesSuccess(state, action);
        default: return state;
    }
};

export default reducer;