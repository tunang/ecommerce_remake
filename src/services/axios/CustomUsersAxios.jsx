import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecom-server-ymra.onrender.com',
});

export default instance;