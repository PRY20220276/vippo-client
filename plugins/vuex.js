import { createStore } from "vuex";
import * as loginStore from "../store/login"
import * as profileStore from "../store/profile"

const store = createStore({
    modules: {
        login: {
            namespaced: true,
            ...loginStore
        },
        profile: {
            namespaced: true,
            ...profileStore
        }
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            store
        }
    }
    // Install the store instance as a plugin

});