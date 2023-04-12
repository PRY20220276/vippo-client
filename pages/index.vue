<template>
  <v-container class="container">
    <div class="text-h3 font-weight-bold">Upload a new video</div>
    <div class="text-subtitle-1 font-weight-light my-2">Our AI Engine will analyze, tag and summarize your video in
      seconds.</div>
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
      setTimeout(async () => {
        const { isConfirmed } = await this.$swal.fire({
          title: "Your video is now uploaded to your gallery and being process", text: "Check the status by clicking the following button.", confirmButtonText: "Go to the usage page", icon: "success"
        })
        if (isConfirmed) {
          this.$router.push("/usage")
        }

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