<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Billing']"
      bg-color="#293040ff"
      class="text-body-2 text-white"
    >
    </v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="mt-4">
      <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white"
        >Usage</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-chip class="mr-2" size="large" label>FREE</v-chip>
      <v-btn prepend-icon="mdi-rotate-right" style="background: linear-gradient(45deg, #6200ee, #7b1fa2)" class="text-white"> Change Plan </v-btn>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <ClientOnly>
      <v-row class="mt-5">
        <v-col cols="4">
          <v-card class="mx-1 card-hover">
            <v-card-title>Storage Status</v-card-title>
            <v-card-text>
              <v-row>
                <v-col style="text-align: center">
                  <v-progress-circular
                    v-model="consumedStorage"
                    color="primary"
                    size="60"
                  ></v-progress-circular>
                </v-col>
                <v-col>
                  <p>Capacity: {{ capacity }}</p>
                  <p>Used: {{ used }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="mt-6">
        <v-toolbar color="background" class="text-primary mt-4">
          <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white"
            >Processing Queue</v-toolbar-title
          >
        </v-toolbar>
        <div class="mt-5">
          <ScheduledVideo
            v-for="(video, index) in queue"
            :key="index"
            class="my-2"
            :title="video.name"
            :createdAt="video.createdAt"
            :services="['Video Analysis and Summary']"
          >
          </ScheduledVideo>
        </div>
      </div>
    </ClientOnly>
  </v-container>
</template>

<script>
export default {
  name: "BillingPage",
  data: () => ({
    consumedStorage: 0,
    capacity: "",
    used: "",
    queue: [],
  }),
  async beforeMount() {
    const response = await this.$store.dispatch("gallery/getStats");
    this.consumedStorage =
      (response.totalStorageUsed / response.maxStorageSize) * 100;
    this.used = response.usedGB;
    this.capacity = response.maxGB;
    this.fetchProcessingVids();
  },
  methods: {
    fetchProcessingVids() {
      $fetch(`https://api.vippo.space/v1/me/videos?filterBy=processing`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.queue = res.items;
        })
        .catch(() => {});
    },
  },
};
</script>
