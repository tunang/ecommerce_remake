import axios from '../axios/CustomUsersAxios'
import axiosInstance from '../axios/CustomAxiosWithHeader'


const loginApi = (email, password) => {
    console.log("check <<<", email, password)
    return axios.post('/api/auth/login', { email, password })
}

const registerApi = (firstname, lastname, email, password) =>{
    return axios.post("/api/auth/register", {firstname, lastname, email, password})
}

const logoutApi = () => {
    return axiosInstance.delete("/api/auth/logout");
}

export { loginApi, registerApi, logoutApi }