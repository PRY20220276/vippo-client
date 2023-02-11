import { createStore } from "vuex";
import * as loginStore from "../store/login"

const store = createStore({
    modules: {
        login: {
            namespaced: true,
            ...loginStore
        }
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin

});