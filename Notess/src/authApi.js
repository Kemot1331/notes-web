import axios from "axios";

export const loginUser = async (email, password) => {
    const API_LOGIN_URL = 'http://localhost:8080/api/auth/login';
    return (await axios.post(API_LOGIN_URL, {email, password})).data;
}

export const registerUser = async (username, email, password) => {
    const API_REGISTER_URL = 'http://localhost:8080/api/auth/register';
    return (await axios.post(API_REGISTER_URL, {username, email, password})).data;
}