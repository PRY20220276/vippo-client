<template>
  <div>
    <div ref="container" class="d-none" :style="style"></div>
    <div ref="preview_empty" :style="{
        width: '100%',
        height: '300px',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }">
      <v-icon color="black" icon="mdi-video-box" size="80px"> </v-icon>
      <p class="text-black" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    fallback: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    error: null,
    style: {
      width: "100%",
      height: "300px",
      background: "black",
    },
  }),
  created() {
    this.buildPreview();
  },
  watch: {
    url() {
      this.refresh();
    },
  },
  methods: {
    refresh() {
      this.error = "";
      if (!this.url) return;
      this.buildPreview();
      this.$forceUpdate();
    },
    buildPreview() {
      let el = this;
      const videoPreview = document.createElement("video");
      videoPreview.src = this.fallback;
      videoPreview.controls = true;
      videoPreview.style.objectFit = "contain";
      videoPreview.style.width = "100%";
      videoPreview.style.height = "100%";
      const handleFallback = () => {
        const fallbackUrl = this.fallback;
        videoPreview.src = fallbackUrl;
        videoPreview.load(); // Reload the video element with the new source
      };
      videoPreview.addEventListener("error", (event) => {
        if (this.url) {
          el.error = "No se puede reproducir el video";
          this.$emit("onPlayBackError", event);
        }
      });
      videoPreview.addEventListener("loadedmetadata", (event) => {
        if (this.$el.querySelector("video")) {
          this.$el.querySelector("video").remove();
        }
        this.$refs["container"].appendChild(videoPreview);
        this.$refs["preview_empty"].classList.add("d-none");
        this.$refs["container"].classList.remove("d-none");
      });
    },
  },
};
</script>
