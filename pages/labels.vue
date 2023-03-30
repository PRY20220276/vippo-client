<template>
    <v-container class="container">
        <div class="text-h3 font-weight-bold">Detección de etiquetas</div>
        <div class="text-subtitle-1 font-weight-light my-2">Detecta las categorias de los eventos de tu video!</div>
        <VideoUploaderBtn @uploaded="onUploadFile" :upload-options="['local']"></VideoUploaderBtn>


    </v-container>
    <v-container class="container">
        <v-row justify="center">
            <v-col md="4" sm="6">
                <div>
                    <v-icon size="35">mdi-account-check</v-icon>
                    <p class="text-subtitle-1 font-medium-normal ">Recomendacion 1</p>
                    <div class="text-medium-emphasis"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                        deleniti nostrum tempora beatae
                        quisquam
                        perferendis eum quis ullam at, cupiditate dolor laudantium eos! Ducimus excepturi autem
                        molestiae
                        provident
                        commodi aut.</div>

                </div>
            </v-col>
            <v-col md="4" sm="6">
                <div>
                    <v-icon size="35">mdi-shield-account</v-icon>
                    <p class="text-subtitle-1 font-medium-normal ">Recomendacion 1</p>
                    <div class="text-medium-emphasis"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                        deleniti nostrum tempora beatae
                        quisquam
                        perferendis eum quis ullam at, cupiditate dolor laudantium eos! Ducimus excepturi autem
                        molestiae
                        provident
                        commodi aut.</div>

                </div>
            </v-col>
            <v-col md="4" sm="6">
                <div>
                    <v-icon size="35">mdi-clock-check</v-icon>
                    <p class="text-subtitle-1 font-medium-normal ">Recomendacion 1</p>
                    <div class="text-medium-emphasis"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                        deleniti nostrum tempora beatae
                        quisquam
                        perferendis eum quis ullam at, cupiditate dolor laudantium eos! Ducimus excepturi autem
                        molestiae
                        provident
                        commodi aut.</div>

                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    methods: {
        onUploadFile(e) {
            const file = e
            setTimeout(() => {
                this.$swal.fire("Petición de etiquetas exitosa", "Estamos procesando tu video. Te notificaremos cuando este listo! </br> También puedes consultar el estado en <b>usage</b>. ", "success")

            }, 1500)
            //this.$store.dispatch("gallery/uploadVideo", { video: file })
        },
    }
}
</script>
<style lang="scss">
.swal2-styled.swal2-confirm {
    background-color: #6200EE;
}

.container {
    padding-top: 5vw;
    text-align: center;

}
</style>