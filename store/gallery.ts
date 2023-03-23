import { ActionTree, GetterTree, MutationTree } from "vuex"
import { GalleryService } from "~~/services/gallery.service"

interface VideoDto {
    name: string
    url: string
}

export const state = (): { videos: VideoDto[] } => ({
    videos: []
})
type RooState = ReturnType<typeof state>
export const mutations: MutationTree<RooState> = {
    setVideos(state, videos: VideoDto[]) {
        state.videos = videos
    },
    appendVideos(state, videos: VideoDto[]) {
        state.videos.push(...videos)
    }


}

export const getters: GetterTree<RooState, RooState> = {
    getVideos(state) {
        return state.videos;
    }
}

export const actions: ActionTree<RooState, RooState> = {
    async fetchGallery({ commit }) {
        const { data }: any = await GalleryService.instance.getVideos();
        const videos: VideoDto[] = data.items.map((v: any) => ({ name: v.name, url: v.url }))
        commit("setVideos", videos)
    },
    async uploadVideo({ dispatch }, { video, onProgressCallback }) {
        const { data } = await GalleryService.instance.uploadVideo(video, onProgressCallback)
        dispatch("fetchGallery")
        return data;
    }

}