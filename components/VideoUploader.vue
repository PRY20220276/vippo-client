<template>
    <div style="text-align: center;">

        <div ref="container" class="d-none" :style="previewStyle">

        </div>
        <div ref="preview_empty"
            :style="{ width: '300px', height: '300px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <v-icon color="black" icon="mdi-video-box" size="80px"> </v-icon>
        </div>

        <v-btn color="primary" variant="outlined" :loading="isSelecting" @click="onBtnClick" style="margin:10px 0">
            Upload File
        </v-btn>
        <input ref="uploader" class="d-none" type="file" @change="onFileChanged">
    </div>
</template>
<script>
export default {
    props: {
        previewStyle: {
            type: Object,
            default: () => ({
                width: "300px",
                height: "300px",
                background: "black"
            })
        }
    },
    data: () => ({
        active: false,
        defaultButtonText: "Subir Video",
        selectedFile: null,
        isSelecting: false,
        portraitMaxWidth: "300px",
        landscapeMaxWidth: "400px"
    }),
    methods: {
        onFileChanged(e) {
            this.selectedFile = e.target.files[0]
            nextTick(() => {
                this.buildPreview()
            })

        },
        onBtnClick() {
            this.isSelecting = true
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })
            this.$refs.uploader.click()
        },
        buildPreview() {
            const videoUrl = URL.createObjectURL(this.selectedFile);
            const videoPreview = document.createElement('video');
            videoPreview.src = videoUrl;
            videoPreview.controls = true;
            videoPreview.style.objectFit = "contain"
            videoPreview.style.width = "100%"
            videoPreview.style.height = "100%"
            videoPreview.addEventListener("loadedmetadata", () => {
                if (document.querySelector("video")) {
                    document.querySelector("video").remove()
                }
                this.$refs["container"].appendChild(videoPreview)
                this.$refs["preview_empty"].classList.add("d-none")
                this.$refs["container"].classList.remove("d-none")
                this.$emit("uploaded", this.selectedFile)
            })
        }
    }
}
</script>
<style>
.dropZoneOverlay,
.FileUpload {
    width: 283px;
    height: 71px;
}

.dropZoneOverlay {
    border: dotted 1px;
    font-family: cursive;
    color: #7066fb;
    position: absolute;
    top: 0px;
    text-align: center;
}

.FileUpload {
    opacity: 0;
    position: relative;
    z-index: 1;
}
</style>