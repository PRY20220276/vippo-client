import { createStore } from "vuex";
import * as loginStore from "../store/login"
import * as profileStore from "../store/profile"
import * as galleryStore from "../store/gallery"
import { updateAuthorizationToken } from "~~/services/config";


export const store = createStore({
    modules: {
        login: {
            namespaced: true,
            ...loginStore
        },
        profile: {
            namespaced: true,
            ...profileStore
        },
        gallery: {
            namespaced: true,
            ...galleryStore
        }
    }
});

const setupInitConfig = () => {
    const token = localStorage.getItem("token");
    if (token) {
        updateAuthorizationToken(token)
        store.commit("profile/logIn")
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    setupInitConfig()
    return {
        provide: {
            store
        }
    }
    // Install the store instance as a plugin

});