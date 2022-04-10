import axios from "axios";
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('authToken');
const Axios = axios.create({   
    // baseURL: "http://localhost:7000/api"
    baseURL: "http://3.108.98.168:3000/api"
    // baseURL: "http://13.233.178.76:3000/api"
});
export default Axios;