import { ActionTree, GetterTree, MutationTree } from "vuex"
import { updateAuthorizationToken } from "~~/services/config"
import { LoginService } from "~~/services/login.service"


export const state = () => ({
    currentPageIndex: 0,
    email: ''
})
type RooState = ReturnType<typeof state>
export const mutations: MutationTree<RooState> = {
    setEmail(state, email: string) {
        state.email = email
    },
    setPage(state, index: number) {
        state.currentPageIndex = index
    }
}

export const getters: GetterTree<RooState, RooState> = {
    getCurrentPage(state) {
        return state.currentPageIndex
    },
    getEmail(state) {
        return state.email;
    }
}

export const actions: ActionTree<RooState, RooState> = {
    async submitEmail({ commit, dispatch }, { email, password }) {
        const { data } = await LoginService.instance.login(email, password);
        updateAuthorizationToken(data.accessToken);
        localStorage.setItem("token", data.accessToken)
        commit('setEmail', email)
        return data
    },
    nextPage({ commit, state }) {
        commit('setPage', state.currentPageIndex + 1)
    },
    backPage({ commit, state }) {
        commit('setPage', state.currentPageIndex - 1)
    },
    retryLogin({ commit, state }) {
        commit('setEmail', "")
        commit('setPage', 1)
    },

}