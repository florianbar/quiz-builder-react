import * as actionTypes from './actionTypes';

const initialState = {
    quizzes: {}
};

const createQuizSuccess = (state, action) => {
    const updatedQuizzes = {
        ...state.quizzes,
        [action.id]: action.data
    };
    return {
        ...state,
        quizzes: updatedQuizzes
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_QUIZ_SUCCESS: return createQuizSuccess(state, action);
        default: return state;
    }
};

export default reducer;