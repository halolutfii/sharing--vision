import axios from "axios";

const customAPI = axios.create({
    baseURL: "http://localhost:8080", 
    withCredentials: true,
});

export default customAPI;