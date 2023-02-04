<template>
    <div class="text-center">
        <v-dialog v-model="dialog" style="max-width: 60vh; min-width: 300px;">
            <template v-slot:activator="{ props }">
                <v-btn variant="outlined" class="ma-2" color="white" v-bind="props">Sign In</v-btn>
            </template>
            <v-card class="text-center">
                <div class="text-right">
                    <v-btn icon="mdi-close" color="gray" variant="text" @click="dialog = false"
                        style="margin: 8px;"></v-btn>
                </div>
                <v-card-title class="text-h5 font-weight-bold">
                    Iniciar Sesión
                </v-card-title>

                <v-card-text>
                    <p class="text-medium-emphasis my-2">
                        Potencia tus proyectos de video
                        con Inteligencia Artifical 🤖

                    </p>
                    <v-btn color="primary" class="my-2" rounded="lg" @click="signIn()">Iniciar sesión con
                        email</v-btn>

                </v-card-text>
                <v-card-actions style="display:block">
                    <p class="text-caption mt-5">By using Vippo, you agree to our<br /><a href="#">Privacy
                            Policy</a>
                        and <a href="#">Terms of Use</a>.</p>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>
<script>

export default {
    data: () => ({
        dialog: false
    }),
    methods: {
        signIn() {
            alert("Signin Passwordless")
        }
    }
}
</script>