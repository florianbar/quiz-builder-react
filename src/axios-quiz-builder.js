import axios from 'axios';

const instance = axios.create({
    baseURL: "https://quiz-builder-react.firebaseio.com/"
});

export default instance;