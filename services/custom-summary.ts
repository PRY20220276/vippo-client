import { AxiosInstance } from "axios";
import axios from "./config";
import axiosDefault from "axios";

export class CustomSummaryService {
    private static _instance: CustomSummaryService;
    static get instance() {
        if (!CustomSummaryService._instance) {
            this._instance = new CustomSummaryService(axios);
        }
        return this._instance;
    }
    constructor(private httpClient: AxiosInstance) { }

    createCustomSummary(summary: any) {
        return this.httpClient.post('https://us-central1-vippo-project.cloudfunctions.net/create_custom_summary', summary, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
    }
}
