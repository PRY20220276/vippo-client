
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('only-logged', {
        beforeMount(el) {
            if (!nuxtApp.$store.getters['profile/getProfile'].logged) {
                el.classList.add("d-none")
            } else {
                el.classList.remove("d-none")
            }
        },
        beforeUpdate(el) {
            if (!nuxtApp.$store.getters['profile/getProfile'].logged) {
                el.classList.add("d-none")
            } else {
                el.classList.remove("d-none")
            }
        }
    })
});