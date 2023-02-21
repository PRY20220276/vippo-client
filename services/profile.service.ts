import { AxiosInstance } from "axios";
import axios from "./config"
import { getHeaders } from "./helpers"

export class ProfileService {
    private static _instance: ProfileService;
    static get instance() {
        if (!ProfileService._instance) {
            this._instance = new ProfileService(axios)
        }
        return this._instance;
    }
    constructor(private httpClient: AxiosInstance) {
    }
    updateProfile(profile: any) {
        const headers = getHeaders()
        return this.httpClient.put("user", profile, { headers })
    }

    getProfile() {
        const headers = getHeaders()
        return this.httpClient.get("user", { headers })
    }


}
