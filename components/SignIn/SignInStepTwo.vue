<template>
    <v-card class="text-center" :ripple="false">
        <div class="text-right">
            <v-btn icon="mdi-close" color="gray" variant="text" @click="onCloseDialog()"></v-btn>
        </div>
        <div class="text-h5 font-weight-bold">
            Iniciar Sesión
        </div>
        <p class="text-medium-emphasis">
            Enviaremos un código a tu correo

        </p>
        <v-card-text>
            <v-text-field label="Email"></v-text-field>
            <v-btn color="primary" block class="my-2" rounded="lg" variant="flat"
                @click.stop="onClick()">Continuar</v-btn>
        </v-card-text>
    </v-card>
</template>
<script lang="js">
export default {
    data: () => ({

    }),
    methods: {
        onClick() {
            this.$emit("click", true)
        },
        onCloseDialog() {
            this.$emit("closeDialog")
        }
    }
}
</script>