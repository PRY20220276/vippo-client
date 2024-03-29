<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->

    <v-breadcrumbs
      :items="['VIPPO', 'Gallery']"
      bg-color="#293040ff"
      class="text-body-2 text-white"
    ></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <ClientOnly>
      <v-toolbar color="background" class="text-primary mt-4">
        <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white"
          >Gallery</v-toolbar-title
        >
      </v-toolbar>
      <!-- End: Page Toolbar -->

      <v-row class="mt-5" v-if="fetch === 'loading'">
        <v-col v-for="n in 6" :key="n" cols="12" sm="4">
          <SkeletonCardLoader :key="n" />
        </v-col>
      </v-row>
      <v-row v-else class="my-5" v-if="fetch === 'done'">
        <v-col
          v-for="(v, index) in $store.getters['gallery/getVideos']"
          :key="v.name"
          cols="12"
          sm="4"
        >
          <v-card
            variant="tonal"
            @click="$router.push(`/videos/${v.name}`)"
            class="zoom-on-hover"
          >
            <VideoPreview
              :key="v.url"
              :url="v.url"
              ref="videoPreviewComponent"
              :thumbnail="v.thumbnail"
              :fallback="v.downloadPath"
              @onPlayBackError="(ev) => onHandleVideoPlayBackError(index)"
            />
            <template v-if="!v.hasError">
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ v.name }}
              </v-card-title>
              <v-card-subtitle class="mb-3">
                {{ v.createdAt }}
              </v-card-subtitle>
              <!--
              <v-card-actions>
                <v-btn
                  density="comfortable"
                  append-icon="mdi-arrow-right"
                  @click="$router.push(`/videos/${v.name}`)"
                  >Details</v-btn
                >
              </v-card-actions>
              -->
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-if="fetch === 'done'"
        v-model="currentPage"
        :length="totalPages"
        rounded="circle"
      ></v-pagination>
    </ClientOnly>
  </v-container>
</template>
<script setup>
definePageMeta({
  middleware: "check-auth",
});
</script>
<script>
import VideoGalleryModal from "~~/components/Modals/VideoGalleryModal.vue";
import SkeletonCardLoader from "~~/components/Shared/SkeletonCardLoader.vue";
export default {
  components: {
    SkeletonCardLoader,
    VideoGalleryModal,
  },
  name: "GalleryPage",
  data: () => ({
    fetch: "",
    currentPage: 1,
    totalPages: 1,
    limit: 50,
  }),
  async created() {
    const resp = await this.fetchData();
    this.totalPages = resp.totalPages;
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      let resp;
      this.fetch = "loading";
      try {
        resp = await this.$store.dispatch("gallery/fetchGallery", {
          limit: this.limit,
          page: this.currentPage,
        });
        this.fetch = "done";
      } catch (error) {
        this.fetch = "error";
      }
      return resp;
    },
    playVideo() {
      this.$refs.videoPreviewComponent.playVideo();
    },
    pauseVideo() {
      this.$refs.videoPreviewComponent.pauseVideo();
    },
    onHandleVideoPlayBackError(videoId) {
      this.$store.commit("gallery/setVideoPlaybackError", videoId);
    },
  },
};
</script>
