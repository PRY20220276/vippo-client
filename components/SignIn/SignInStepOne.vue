<template>
    <v-card class="text-center">
        <div class="text-right">
            <v-btn icon="mdi-close" color="gray" variant="text" @click.stop="onCloseDialog()"></v-btn>
        </div>
        <v-card-title>
            <div class="text-h5 font-weight-bold">
                Iniciar Sesión
            </div>
        </v-card-title>
        <v-card-text class="text-medium-emphasis">

            Potencia tus proyectos de video
            con Inteligencia Artifical 🤖

        </v-card-text>
        <v-card-actions style="display:block">
            <v-btn color="primary" class="my-2" rounded="lg" variant="flat" @click.stop="onClick()">Iniciar sesión
                con
                email</v-btn>

            <p class="text-caption mt-5">By using Vippo, you agree to our<br /><a href="#">Privacy
                    Policy</a>
                and <a href="#">Terms of Use</a>.</p>

        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    data: () => ({

    }),
    methods: {
        onClick() {
            this.$emit("submit", true)
        },
        onCloseDialog() {
            this.$emit("closeDialog")
        }
    }
}
</script>