import axios from 'axios';

const axiosConfig = {
    withCredentials: true,
}  

export default axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: axiosConfig
});