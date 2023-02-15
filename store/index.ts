import { ActionTree, GetterTree, MutationTree } from "vuex"

export const state = () => ({
    currentPageIndex: 2,
    email: ''
})
export type RooState = ReturnType<typeof state>
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
    }
}

export const actions: ActionTree<RooState, RooState> = {
    submitEmail({ commit }, email) {
        commit('setEmail', email)
    },
    nextPage({ commit, state }) {
        commit('setPage', state.currentPageIndex + 1)
    },
    backPage({ commit, state }) {
        commit('setPage', state.currentPageIndex - 1)
    }

}