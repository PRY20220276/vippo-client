import { AxiosInstance } from "axios";
import axios from "./config";
import axiosDefault from "axios";

export class GalleryService {
  private static _instance: GalleryService;
  static get instance() {
    if (!GalleryService._instance) {
      this._instance = new GalleryService(axios);
    }
    return this._instance;
  }
  constructor(private httpClient: AxiosInstance) {}

  getSignedUrl(video: File) {
    return this.httpClient.post("/me/videos/signed-url", {
      contentType: video.type,
      fileName: video.name,
    });
  }
  getVideos(limit: number = 6, page: number = 1) {
    return this.httpClient.get("/me/videos", {
      params: {
        limit,
        page,
      },
    });
  }
  uploadVideo(
    video: File,
    signedURL: string,
    onUploadProgressCallback: (percentCompleted: number) => void
  ) {
    return axiosDefault.put(signedURL, video, {
      headers: {
        "Content-Type": video.type,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        onUploadProgressCallback(percentCompleted);
      },
    });
  }
  getCurrentVideoStats() {
    return this.httpClient.get("/me/videos/stats");
  }
}
