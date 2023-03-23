<template>
    <ClientOnly>


        <v-tabs v-model="tab">
            <v-tab v-for="t in tabs" :key="t.value" :disabled="t.disabled" :value="t.value">{{ t.label }}</v-tab>
        </v-tabs>
        <v-container>
            <v-window v-model="tab">
                <v-window-item value="detalle">
                    <div style="display:flex;padding: 10px;">
                        <VideoUploader @uploaded="onUploadFile" />
                        <div style="flex:1 1 auto; margin: 0px 30px;">
                            <v-form ref="video_form">
                                <v-textarea label="Título" rows="1" color="primary" v-model="videoTitle"
                                    :disabled="!selectedFile" variant="outlined"
                                    :rules="[v => !!v || 'El título es obligatorio']" style="margin: 10px 0 "></v-textarea>
                                <v-textarea label="Descripción (Opcional)" color="primary" v-model="videoDescription"
                                    :disabled="!selectedFile" variant="outlined"></v-textarea>
                            </v-form>
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="btn-actions">
                        <v-btn @click="submitPhaseOne" rounded dark>Siguiente</v-btn>
                    </div>
                </v-window-item>
                <v-window-item value="configuracion">
                    <div style="display:flex;padding: 10px;">
                        <div style="flex:1 1 auto; margin: 0px 30px;">
                            <<<<<<< HEAD <v-form ref="video_form">
                                =======
                                <v-form ref="configuration_form">
                                    >>>>>>> 5838653 (add shot page)
                                    <v-textarea label="Título" rows="1" color="primary" v-model="videoTitle"
                                        :disabled="!selectedFile" variant="outlined"></v-textarea>
                                    <v-textarea label="Descripción" color="primary" v-model="videoDescription"
                                        :disabled="!selectedFile" variant="outlined"></v-textarea>
                                </v-form>
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="btn-actions">
                        <v-btn @click="onNext" rounded dark>Siguiente</v-btn>
                    </div>
                </v-window-item>


            </v-window>
        </v-container>




    </ClientOnly>
</template>

<script >
export default {
    data: () => ({
        tab: "",
        videoTitle: "",
        videoDescription: "",
        tabs: [{ label: 'Detalles', value: "detalle", disabled: false }, { label: "Configuración", value: "configuracion", disabled: true }]
    }),
    methods: {
        onUploadFile(file) {
            this.selectedFile = file
            this.videoTitle = this.selectedFile.name
        },
        async submitPhaseOne() {
            const { valid } = await this.$refs.video_form.validate()
            if (!valid) return;

            this.onNext()
        },
        onNext() {
            switch (this.tab) {
                case "detalle":
                    this.tab = "configuracion";
                    this.tabs[1].disabled = false
                    break;
                case "configuracion":
                    alert("no mas ");
                    break;
                default:
                    break;
            }
        }
    }

}
</script>
<style scoped>
.btn-actions {
    display: flex;
    justify-content: right;
    margin: 20px 20px;
}
</style>
