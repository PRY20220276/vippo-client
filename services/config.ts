import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://api.vippo.space/v1"
})

export default axiosInstance