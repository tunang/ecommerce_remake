import axios from '../axios/CustomUsersAxios'



const loginApi = (email, password) => {
    console.log("check <<<", email, password)
    return axios.post('/api/auth/login', { email, password })
}

const registerApi = (firstname, lastname, email, password) =>{
    return axios.post("/api/auth/register", {firstname, lastname, email, password})
}

export { loginApi, registerApi }