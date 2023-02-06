<template>
    <p class="text-medium-emphasis">
        Potencia tus proyectos de video
        con Inteligencia Artifical 🤖
    </p>
    <div>
        <v-btn color="primary" class="my-2" rounded="lg" variant="flat" @click.stop="onClick()">Iniciar sesión
            con
            email</v-btn>

        <p class="text-caption mt-5">By using Vippo, you agree to our<br /><a href="#">Privacy
                Policy</a>
            and <a href="#">Terms of Use</a>.</p>
    </div>
</template>
<script>
export default {
    data: () => ({


    }),
    methods: {
        onClick() {
            this.$store.dispatch("login/nextPage")
        }
    }
}
</script>