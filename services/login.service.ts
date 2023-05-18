import { AxiosInstance } from "axios";
import axios from "./config"

export class LoginService {
    private static _instance: LoginService;
    static get instance() {
        if (!LoginService._instance) {
            this._instance = new LoginService(axios)
        }
        return this._instance;
    }
    constructor(private httpClient: AxiosInstance) {
    }
    login(email: string, password: string) {
        return this.httpClient.post("/auth/login-email", {
            email,
            password
        })
    }
    verifyTOTP(code: string, email: string) {
        return this.httpClient.post("login/totp/verify", {
            code,
            email
        })
    }
    signUp({ password, email }: { password: string, email: string }) {
        return this.httpClient.post("/auth/register", {
            email, password
        })
    }
}
