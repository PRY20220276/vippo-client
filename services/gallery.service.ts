import { AxiosInstance } from "axios";
import axios from "./config"

export class GalleryService {
    private static _instance: GalleryService;
    static get instance() {
        if (!GalleryService._instance) {
            this._instance = new GalleryService(axios)
        }
        return this._instance;
    }
    constructor(private httpClient: AxiosInstance) {
    }

    getVideos(limit: number = 10, page: number = 1) {
        return this.httpClient.get("/videos", {
            params: {
                limit, page
            }
        })
    }
    uploadVideo(video: File, onUploadProgressCallback: (percentCompleted: number) => void) {
        const request: FormData = new FormData()
        request.append("video", video);
        return this.httpClient.post("/videos", request, {
            headers: { "Content-Type": "multipart/form-data" }, onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                onUploadProgressCallback(percentCompleted)
            }
        })
    }


}
