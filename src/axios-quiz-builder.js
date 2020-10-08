import axios from 'axios';

const instance = axios.create({
    baseURL: "https://quiz-builder-react-01.firebaseio.com/"
});

export default instance;