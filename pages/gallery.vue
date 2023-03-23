<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->

    <v-breadcrumbs :items="['VIPPO', 'Gallery']" bg-color="indigo-lighten-5" class="text-body-2"></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <ClientOnly>
      <v-toolbar color="background" class="text-primary mt-4">
        <v-toolbar-title class="ml-1 text-h5">Gallerie</v-toolbar-title>
        <v-spacer></v-spacer>
        <VideoUploadCloud :upload-options="['local']" />

      </v-toolbar>
      <!-- End: Page Toolbar -->

      <v-row class="mt-5" v-if="!$store.getters['gallery/getVideos'].length">
        <v-col v-for="n in   6" :key="n" cols="12" sm="4">
          <v-card elevation="3" @click="$router.push('/servicios')">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>
            <v-card-subtitle> 14/07/2021</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="mt-5">
        <v-col v-for="v in $store.getters['gallery/getVideos']" :key="v.name" cols="12" sm="4">
          <VideoPreview :key="v.name" :url="v.url" />
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>
<script setup>
definePageMeta({
  middleware: 'check-auth'
})
</script>
<script>
export default {
  name: "GalleryPage",
  data: () => ({
  }),
  created() {
    this.$store.dispatch("gallery/fetchGallery")

  }

};
</script>
