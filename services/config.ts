import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://vippo.space/"
})

export default axiosInstance