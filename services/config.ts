import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://100.26.53.188:3000/"
})

export default axiosInstance