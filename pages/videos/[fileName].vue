<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->

    <v-breadcrumbs
      :items="['VIPPO', 'Videos', $route.params.fileName]"
      bg-color="indigo-lighten-5"
      class="text-body-2"
    ></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">Video Details</v-toolbar-title>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <!-- Video Player Row -->
    <v-row v-if="video" class="mt-4">
      <v-col>
        <v-card color="black">
          <div
            :style="{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              overflow: 'hidden',
            }"
          >
            <video
              ref="videoElement"
              :src="video.src"
              controls
              preload="metadata"
              :style="{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }"
            ></video>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- End: Video Player Row -->

    <!-- Card Component Row -->
    <v-row v-if="video && video.meta.processed" class="mt-4">
      <v-col>
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" color="white">
            <v-tab value="labels">Labels</v-tab>
            <v-tab value="objects">Objects</v-tab>
            <v-tab value="summary">Summary</v-tab>
            <v-tab value="explicit">Explicit</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="labels">
                <ul>
                  <li
                    v-for="(label, index) in video.meta.labels"
                    :key="index"
                    class="text-subtitle-1 text-capitalize font-weight-bold"
                  >
                    {{ label }}
                  </li>
                </ul>
              </v-window-item>

              <v-window-item value="objects">
                {{ video.meta.objects || [] }}
              </v-window-item>

              <v-window-item value="summary">
                <v-btn @click="playSummary"
                  >Play Summary {{ hightlight }}/{{
                    video.meta.summary.length
                  }}</v-btn
                >

                <br />
                {{ video.meta.summary || [] }}
              </v-window-item>

              <v-window-item value="explicit">
                {{ video.meta.explicitContent || [] }}
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="mt-4">
      <v-col>
        <v-alert
          type="info"
          title="Analysis Not Found"
          text="This means that your video is still being processed in the backend. Please return later to see the results."
          variant="tonal"
        ></v-alert>
      </v-col>
    </v-row>
    <!-- End: Card Component Row -->
  </v-container>
</template>
<script setup>
definePageMeta({
  middleware: "check-auth",
});
</script>
<script>
export default {
  name: "VideoDetailsPage",
  data: () => ({
    video: null,
    tab: null,
    hightlight: 0,
  }),
  mounted() {
    this.fetchVideo();
  },
  methods: {
    fetchVideo() {
      $fetch(
        `https://api.vippo.space/v1/me/videos/${this.$route.params.fileName}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      )
        .then((res) => {
          console.log(res);
          this.video = res;
        })
        .catch(() => {
          this.$router.push("/gallery");
        });
    },
    playSummary() {
      const videoElement = this.$refs.videoElement;
      let currentClipIndex = 0;
      this.hightlight = 0;

      const playNextClip = () => {
        if (currentClipIndex < this.video.meta.summary.length) {
          const clip = this.video.meta.summary[currentClipIndex];
          videoElement.currentTime = clip.startTime;
          videoElement.play();
          setTimeout(() => {
            videoElement.pause();
            currentClipIndex++;
            this.hightlight += 1;
            playNextClip();
          }, (clip.endTime - clip.startTime) * 1000);
        } else {
          currentClipIndex = 0;
        }
      };

      playNextClip();
    },
  },
};
</script>
