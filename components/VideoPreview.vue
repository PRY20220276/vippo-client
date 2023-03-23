<template>
    <div>
        <div ref="container" class="d-none" :style="style">
        </div>
        <div ref="preview_empty"
            :style="{ width: '300px', height: '300px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <v-icon color="black" icon="mdi-video-box" size="80px"> </v-icon>
        </div>
        <p class="text-red" v-if="error">{{ error }}</p>
    </div>
</template>
<script>
export default {
    props: {
        url: {
            type: String,
            default: ""
        }
    },
    data: () => ({
        error: null,
        style: {
            width: "300px",
            height: "300px",
            background: "black"
        }
    }),
    beforeMount() {
        this.buildPreview()
    },
    watch: {
        url() {
            this.refresh()
        }
    },
    methods: {
        refresh() {
            if (!this.url) return;
            this.buildPreview()
            this.$forceUpdate()
        },
        buildPreview() {
            let el = this
            const videoPreview = document.createElement('video');
            videoPreview.src = this.url;
            videoPreview.controls = true;
            videoPreview.style.objectFit = "contain"
            videoPreview.style.width = "100%"
            videoPreview.style.height = "100%"
            videoPreview.addEventListener("error", (event) => {
                if (this.url) {
                    el.error = "No se puede reproducir el video"
                }
            })
            videoPreview.addEventListener("loadedmetadata", (event) => {
                if (this.$el.querySelector("video")) {
                    this.$el.querySelector("video").remove()
                }
                this.$refs["container"].appendChild(videoPreview)
                this.$refs["preview_empty"].classList.add("d-none")
                this.$refs["container"].classList.remove("d-none")
            })
        }
    }

}
</script>