import axios from "axios";
const Axios = axios.create({
    // baseURL: "http://13.233.143.103/api",
    baseURL: "http://localhost:7000/api"
});

export default Axios;