import { ActionTree, GetterTree, MutationTree } from "vuex"
import { LoginService } from "~~/services/login.service"
import { ProfileService } from "~~/services/profile.service"


export const state = () => ({
    logged: false,
    firstname: '',
    lastname: '',
    email: ''
})
type RooState = ReturnType<typeof state>
export const mutations: MutationTree<RooState> = {
    setProfile(state, profile: any) {
        state.firstname = profile.firstname
        state.lastname = profile.lastname
        state.email = profile.email
    },
    logIn(state, payload: any) {
        state.logged = true
    },
    logOut(state, payload: any) {
        state.logged = false
    }
}

export const getters: GetterTree<RooState, RooState> = {
    getProfile(state) {
        return {
            logged: state.logged,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email
        };
    }
}

export const actions: ActionTree<RooState, RooState> = {
    async updateProfile({ commit }, profile) {
        const resp = await ProfileService.instance.updateProfile(profile)
        commit("setProfile", profile)
    },
    async logout({ commit }) {
        commit("setProfile", {
            firstname: '',
            lastname: '',
            email: ''
        })
        commit("logOut")
        localStorage.removeItem("token")
    }
}