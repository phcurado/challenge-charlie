import axios from 'axios';

const httpInstance = axios.create({
    timeout: 100000,
});
export default httpInstance;
