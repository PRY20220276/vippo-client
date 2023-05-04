<template>
  <v-dialog
    v-model="modalActive"
    style="max-width: 60vw; min-width: 300px"
    persistent
  >
    <v-card>
      <v-card-title>
        <h4 class="text-primary">Uploading video</h4>
      </v-card-title>
      <v-card-text style="margin-bottom: 15px">
        <div>
          <v-progress-linear
            v-model="progressValue"
            buffer-value="100"
            color="primary"
          ></v-progress-linear>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-container class="container">
    <div class="text-h3 font-weight-bold">Upload a new video</div>
    <div class="text-subtitle-1 font-weight-light my-2">
      Our AI Engine will analyze, tag and summarize your video in seconds.
    </div>
    <VideoUploaderBtn
      @uploaded="onUploadFile"
      :upload-options="['local']"
    ></VideoUploaderBtn>
  </v-container>
  <v-container class="container">
    <v-row justify="center">
      <v-col md="4" sm="6">
        <div>
          <v-icon size="35">mdi-cloud-upload</v-icon>
          <p class="text-subtitle-1 font-medium-normal">Upload</p>
          <div class="text-medium-emphasis">
            Your video will be stored in your personal gallery. In the
            background, our systems will analyze your video and give you the
            results.
          </div>
        </div>
      </v-col>
      <v-col md="4" sm="6">
        <div>
          <v-icon size="35">mdi-memory</v-icon>
          <p class="text-subtitle-1 font-medium-normal">Analyze</p>
          <div class="text-medium-emphasis">
            Our AI-assisted engine will analyze your video giving you valuable
            information and will also apply video summarization techniques.
          </div>
        </div>
      </v-col>
      <v-col md="4" sm="6">
        <div>
          <v-icon size="35">mdi-format-list-text</v-icon>
          <p class="text-subtitle-1 font-medium-normal">Result</p>
          <div class="text-medium-emphasis">
            You can check the results of your video and the summarized version.
            You can also share the short clip into another platform!
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    modalActive: false,
    progressValue: 0,
    file: null,
  }),
  watch: {
    progressValue(value) {
      if (value >= 100.0) {
        this.modalActive = false;
        this.resetInterval();
      }
    },
  },
  methods: {
    resetInterval() {
      this.progressValue = 0;
    },
    async onUploadFile(e) {
      const file = e;
      let el = this;
      const { signedUrl } = await this.$store.dispatch("gallery/getSignedURL", {
        video: file,
      });
      this.modalActive = true;
      await this.$store.dispatch("gallery/uploadVideo", {
        video: file,
        signedURL: signedUrl,
        onProgressCallback: (percentCompleted) => {
          el.progressValue = percentCompleted;
        },
      });
      const { isConfirmed } = await this.$swal.fire({
        title: "Your video is now uploaded to your gallery and being process",
        text: "Check the satus by clicking the following button.",
        confirmButtonText: "Go to the usage page",
        icon: "success",
      });
      if (isConfirmed) {
        this.$router.push("/usage");
      }
    },
  },
};
</script>
<style lang="scss">
.swal2-styled.swal2-confirm {
  background-color: #6200ee;
}

.container {
  padding-top: 5vw;
  text-align: center;
}
</style>
