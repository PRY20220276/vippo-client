<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->

    <v-breadcrumbs :items="['VIPPO', 'Gallery']" bg-color="indigo-lighten-5" class="text-body-2"></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <ClientOnly>
      <v-toolbar color="background" class="text-primary mt-4">
        <v-toolbar-title class="ml-1 text-h5">Gallery</v-toolbar-title>


      </v-toolbar>
      <!-- End: Page Toolbar -->

      <v-row class="mt-5" v-if="fetch === 'loading'">
        <v-col v-for="n in   6" :key="n" cols="12" sm="4">
          <SkeletonCardLoader :key="n" />
        </v-col>
      </v-row>
      <v-row v-else class="my-5" v-if="fetch === 'done'">
        <v-col v-for="(v, index) in $store.getters['gallery/getVideos']" :key="v.name" cols="12" sm="4">
          <v-card>
            <VideoPreview :key="v.url" :url="v.url" @onPlayBackError="(ev) => onHandleVideoPlayBackError(index)" />
            <template v-if="!v.hasError">
              <v-card-title>
                {{ v.name }}
              </v-card-title>
              <v-card-actions>
                <VideoGalleryModal :videoIndex="index"></VideoGalleryModal>
              </v-card-actions>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination v-if="fetch === 'done'" v-model="currentPage" :length="totalPages" rounded="circle"></v-pagination>
    </ClientOnly>
  </v-container>
</template>
<script setup>
definePageMeta({
  middleware: 'check-auth'
})
</script>
<script>
import VideoGalleryModal from '~~/components/Modals/VideoGalleryModal.vue';
import SkeletonCardLoader from '~~/components/Shared/SkeletonCardLoader.vue';
export default {
  components: {
    SkeletonCardLoader,
    VideoGalleryModal
  },
  name: "GalleryPage",
  data: () => ({
    fetch: '',
    currentPage: 1,
    totalPages: 1,
    limit: 6
  }),
  async created() {
    const resp = await this.fetchData()
    this.totalPages = resp.totalPages
  },
  watch: {
    currentPage() {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      let resp;
      this.fetch = 'loading';
      try {
        resp = await this.$store.dispatch("gallery/fetchGallery", { limit: this.limit, page: this.currentPage })
        this.fetch = 'done'
      } catch (error) {
        this.fetch = "error"
      }
      return resp
    },
    onHandleVideoPlayBackError(videoId) {
      this.$store.commit("gallery/setVideoPlaybackError", videoId)
    }
  }

};
</script>
