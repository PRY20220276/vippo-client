<template>
    <div>
        <div ref="container" class="d-none" :style="style">
        </div>
        <div ref="preview_empty"
            :style="{ width: '300px', height: '300px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <v-icon color="black" icon="mdi-video-box" size="80px"> </v-icon>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        video: {
            type: Object,
            default: () => {
                return null
            }
        }
    },
    data: () => ({
        style: {
            width: "300px",
            height: "300px",
            background: "black"
        }
    }),
    watch: {
        video() {
            if (!this.video) return;
            this.buildPreview()
            this.$forceUpdate()
        }
    },
    methods: {
        buildPreview() {
            const videoUrl = URL.createObjectURL(this.video);
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
            })
        }
    }

}
</script>