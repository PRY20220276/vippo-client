<template>
    <v-dialog v-model="modalActive" style="max-width: 60vw; min-width: 300px;" persistent>
        <v-card>
            <v-card-title>
                <h4 class="text-primary">Subiendo video</h4>
            </v-card-title>
            <v-card-text style="margin-bottom: 15px;">
                <div>
                    <p>{{ file.name }}</p>
                    <v-progress-linear v-model="progressValue" buffer-value="100"></v-progress-linear>
                </div>
            </v-card-text>

        </v-card>

    </v-dialog>
    <VideoUploaderBtn @uploaded="onUploadFile" :upload-options="['local']" />
</template>
<script>
export default {
    data: () => ({
        modalActive: false,
        progressValue: 0,
        file: null,
        interval: 0
    }),
    watch: {
        progressValue(value) {
            if (value > 100) {
                this.modalActive = false
                this.submitVideo()
                this.resetInterval()
            }
        }
    },
    methods: {
        onUploadFile(e) {
            this.file = e
            this.modalActive = true;
            this.interval = setInterval(() => {
                this.progressValue += 10
            }, 1350)
        },
        resetInterval() {
            clearInterval(this.interval)
            this.progressValue = 0
        },

        submitVideo() {
            this.$swal.fire("Subida de video exitosa", "Tu video se ha subido correctamente!", "success")

        }
    }
}
</script>