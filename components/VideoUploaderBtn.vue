<template>
  <div>
    <v-dialog v-model="modalActive" width="500px" min-width="300px" persistent>
      <v-card>
        <v-card-title>
          <div style="display: flex; justify-content: space-between">
            <div class="text-h5 text-gray">Upload from...</div>
            <v-icon @click="closeModal">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-text>
          <v-btn
            style="background-color: #ebbc81"
            disabled
            block
            class="my-2"
            v-if="uploadOptions.find((x) => x === 'gallery')"
            >Desde la galería</v-btn
          >
          <v-btn
            style="background: linear-gradient(45deg, #6200ee, #7b1fa2)"
            prepend-icon="mdi-cellphone-link"
            class="my-2"
            block
            @click="uploadFromDevice"
            v-if="uploadOptions.find((x) => x === 'local')"
            >From my device</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn
      style="background: linear-gradient(45deg, #6200ee, #7b1fa2)"
      prepend-icon="mdi-tray-arrow-up"
      size="x-large"
      class="mt-4"
      :loading="isSelecting"
      @click="onBtnClick"
    >
      Upload Video
    </v-btn>
    <input ref="uploader" class="d-none" type="file" @change="onFileChanged" />
  </div>
</template>
<script>
export default {
  props: {
    uploadOptions: {
      type: Array,
      default: () => {
        return ["gallery", "local"];
      },
    },
    previewStyle: {
      type: Object,
      default: () => ({
        width: "300px",
        height: "300px",
        background: "black",
      }),
    },
  },
  data: () => ({
    modalActive: false,
    defaultButtonText: "Subir Video",
    selectedFile: null,
    isSelecting: false,
  }),
  methods: {
    closeModal() {
      this.isSelecting = false;
      this.modalActive = false;
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.$emit("uploaded", this.selectedFile);
      this.selectedFile = null;
      this.$refs.uploader.value = null;
    },
    onBtnClick() {
      this.isSelecting = true;
      this.modalActive = true;
    },
    uploadFromDevice() {
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
      this.modalActive = false;
    },
  },
};
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
