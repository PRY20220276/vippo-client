<template>
    <div>
        <p class="text-medium-emphasis pb-2">
            Por favor revisa tu correo <span class="text-primary">{{ $store.getters["login/getEmail"] }}</span>
        </p>
        <v-text-field label="Ingresa el código" v-model="code"></v-text-field>
        <v-btn color="primary" block class="my-2" rounded="lg" variant="flat" @click.stop="onClick()">Login</v-btn>
        <p class="text-caption mt-5">Si no recibiste el código. Revisa tu carpeta de spam
            <br />
            <a href="#" @click.prevent="$store.dispatch('login/retryLogin')">Reintentar</a>.
        </p>
    </div>
</template>
<script>
export default {
    props: ["email"],
    data: () => ({
        code: ''
    }),
    methods: {
        async onClick() {
            const resp = await this.$store.dispatch("login/submitTOPT", this.code)
            localStorage.setItem("token", resp.accessToken)
            this.$store.commit("profile/setProfile", resp.profile)
            this.$emit("onSubmit", "easdasd")
        },
    }
}
</script>