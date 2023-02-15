import { Middleware } from '@nuxt/types'
import { ProfileService } from '~~/services/profile.service';

const myMiddleware: Middleware = async (context: any) => {
    if (process.server) {

        return
    }
    const { $store, $router } = useNuxtApp();

    if ($store.getters["profile/getProfile"].logged) {
        return
    }
    const token = localStorage.getItem("token")
    if (!token) {
        $router.push("/")
    } else {
        try {
            const { data } = await ProfileService.instance.getProfile()
            $store.commit("profile/setProfile", data)
        } catch (error) {
            $router.push("/")
        }
    }
}
export default myMiddleware

