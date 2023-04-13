import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://api.vippo.space/v1"
})
export const updateAuthorizationToken = (token: string) => {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
}
export default axiosInstance