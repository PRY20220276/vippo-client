import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://10.141.142.23:3000/v1"
})
export const updateAuthorizationToken = (token: string) => {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
}
export default axiosInstance