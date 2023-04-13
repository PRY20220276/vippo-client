import { ActionTree, GetterTree, MutationTree } from "vuex"
import { GalleryService } from "~~/services/gallery.service"

const mockVideoAnalysisData = {
    "labels": JSON.parse("[{\"entity\":{\"entityId\":\"/m/08863x\",\"description\":\"bird's eye view\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/025s3q0\",\"description\":\"landscape\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.9105308055877686}]},{\"entity\":{\"entityId\":\"/m/0204fg\",\"description\":\"skyline\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.9602005481719971}]},{\"entity\":{\"entityId\":\"/m/034z7h\",\"description\":\"cityscape\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.9557714462280273}]},{\"entity\":{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/043rvww\",\"description\":\"geographical feature\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.982783854007721}]},{\"entity\":{\"entityId\":\"/m/0d9wj\",\"description\":\"urban design\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01g317\",\"description\":\"person\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.35196858644485474}]},{\"entity\":{\"entityId\":\"/m/0cgh4\",\"description\":\"building\",\"languageCode\":\"en-US\"},\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.9341511130332947}]},{\"entity\":{\"entityId\":\"/m/0j_s4\",\"description\":\"metropolitan area\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.795722484588623}]},{\"entity\":{\"entityId\":\"/m/01fdzj\",\"description\":\"tower\",\"languageCode\":\"en-US\"},\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.31172633171081543}]},{\"entity\":{\"entityId\":\"/m/01l7t2\",\"description\":\"downtown\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.6653841137886047}]},{\"entity\":{\"entityId\":\"/m/039jbq\",\"description\":\"urban area\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.8503000736236572}]},{\"entity\":{\"entityId\":\"/m/056mk\",\"description\":\"metropolis\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/01n32\",\"description\":\"city\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.76247239112854}]},{\"entity\":{\"entityId\":\"/m/079cl\",\"description\":\"skyscraper\",\"languageCode\":\"en-US\"},\"categoryEntities\":[{\"entityId\":\"/m/0cgh4\",\"description\":\"building\",\"languageCode\":\"en-US\"}],\"segments\":[{\"segment\":{\"startTimeOffset\":{},\"endTimeOffset\":{\"seconds\":\"7\",\"nanos\":533333000}},\"confidence\":0.9698628187179565}]}]"),
    "transcript": "[]",
    "explicitContent": JSON.parse("{\"frames\":[{\"timeOffset\":{\"nanos\":240842000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"1\",\"nanos\":392471000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"2\",\"nanos\":300256000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"3\",\"nanos\":483135000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"4\",\"nanos\":327201000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"5\",\"nanos\":341678000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"6\",\"nanos\":479309000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"},{\"timeOffset\":{\"seconds\":\"7\",\"nanos\":329083000},\"pornographyLikelihood\":\"VERY_UNLIKELY\"}]}"),
    "summary": null,
    "createdAt": "2023-03-24T01:31:54.770Z",
    "updatedAt": "2023-03-24T01:31:54.770Z",
    "videoId": 8
}

interface VideoDto {
    name: string
    url: string
    hasError: boolean
    id: number
    videoAnalysis?: any
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
    },
    setVideoPlaybackError(state, videoId: number) {
        const auxArr = [...state.videos];
        auxArr[videoId].hasError = true
        state.videos = auxArr;
    }


}

export const getters: GetterTree<RooState, RooState> = {
    getVideos(state) {
        return state.videos;
    },
    getVideoByIndex: (state) => (id: number) => {
        return state.videos[id];
    }
}

export const actions: ActionTree<RooState, RooState> = {
    async fetchGallery({ commit }, { limit, page }: { limit: number, page: number }) {
        const { data }: any = await GalleryService.instance.getVideos(limit, page);
        const videos: VideoDto[] = data.items.map((v: any) => ({ name: v.originalName, url: v.url, hasError: false, id: v.id, videoAnalysis: mockVideoAnalysisData }))
        commit("setVideos", videos)
        return { totalItems: data.totalItems, page: data.page, totalPages: data.totalPages }
    },
    async uploadVideo({ dispatch }, { video, signedURL, onProgressCallback }) {
        const { data } = await GalleryService.instance.uploadVideo(video, signedURL, onProgressCallback)
        return data;
    },
    async getStats() {
        const { data } = await GalleryService.instance.getCurrentVideoStats()
        return data
    },

    async getSignedURL(store, { video }) {
        const { data } = await GalleryService.instance.getSignedUrl(video)
        return data
    }

}