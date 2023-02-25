<template>
    <div style="text-align:center">
        <VideoPreview :video="selectedVideo" />
        <VideoUploaderBtn @uploaded="onUploadFile" />
    </div>
</template>
<script>
export default {
    data: () => ({
        selectedVideo: null
    }),
    methods: {
        onUploadFile(file) {
            this.selectedVideo = file
            this.$emit("uploaded", file)
        }
    }
}
</script>
