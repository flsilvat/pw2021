import axios from 'axios';

const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const services = {};

services.login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signin`,
            {
                "username": username,
                "password": password
            }
        );
        return response;
    } catch (error) {
        const { response } = error;
        return response;
    }
}

services.verifyToken = async (token) => {
    const response = await axios.get(`${BASE_URL}/auth/whoami`,{
        headers: {
            Authorization: `Bearer ${ token }`
        }
    });
    if (response.status === 200) return response.data;
    else return {};
}

export default services;