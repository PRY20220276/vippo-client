import { Middleware } from '@nuxt/types'
import { updateAuthorizationToken } from '~~/services/config';

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
        updateAuthorizationToken(token)

    }
}
export default myMiddleware

