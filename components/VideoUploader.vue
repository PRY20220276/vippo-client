<template>
    <div style="text-align:center">
        <VideoPreview :url="sourceUrl" />
        <VideoUploaderBtn @uploaded="onUploadFile" />
    </div>
</template>
<script>
export default {
    data: () => ({
        sourceUrl: null
    }),
    methods: {
        onUploadFile(file) {
            this.sourceUrl = URL.createObjectURL(file)
            this.$emit("uploaded", file)
        }
    }
}
</script>
