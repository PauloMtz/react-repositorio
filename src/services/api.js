import axios from "axios"; // npm install axios

const api = axios.create({
    baseURL: 'https://api.github.com'
});

export default api;
