import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecom-server-fuq2.onrender.com',
});

export default instance;