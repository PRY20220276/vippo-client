<template>
    <VideoUploaderBtn @uploaded="onUploadFile" />
</template>
<script>
export default {
    methods: {
        onUploadFile(e) {
            setTimeout(() => {
                this.$swal.fire("Subida de video exitosa", "Tu video se ha subido correctamente!", "success")
            }, 1500)
        }
    }
}
</script>