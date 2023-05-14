<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->

    <v-breadcrumbs
      :items="['VIPPO', 'Videos', $route.params.fileName]"
      bg-color="#293040ff"
      class="text-body-2 text-white"
    ></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white">
        <v-icon icon="mdi-video" size="small" left></v-icon>
        Video Playback
      </v-toolbar-title>
    </v-toolbar>
    <v-divider class="mb-3"></v-divider>

    <!-- End: Page Toolbar -->
    <!-- Video Player Row -->
    <v-row v-if="video">
      <v-col>
        <v-card color="black">
          <video
            ref="videoElement"
            :src="video.downloadPath"
            controls
            class="fit-video"
          ></video>
        </v-card>
      </v-col>
    </v-row>
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white">
        <v-icon icon="mdi-content-cut" size="small" left></v-icon>
        Video Summarization
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="secondary"
        @click="hideSummary = !hideSummary"
        size="small"
      >
        <v-icon>{{ hideSummary ? "mdi-eye-off-outline" : "mdi-eye" }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-3"></v-divider>
    <!-- Card Component Row -->
    <v-row v-if="video && video.meta.processed">
      <v-col v-if="!hideSummary">
        <v-card variant="tonal">
          <v-tabs v-model="tabSummary" bg-color="primary" color="white">
            <v-tab value="summary_transcript">Podcast Summary</v-tab>
            <v-tab value="summary_object">Scene Summary</v-tab>
            <v-tab value="custom_summary">Custom Summary</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tabSummary">
              <v-window-item value="summary_transcript">
                <v-row v-if="video.meta.podcast_summarization">
                  <v-col>
                    <video
                      controls
                      style="object-fit: contain; width: 100%; height: 100%"
                      :src="video.meta.podcast_summarization[0]"
                    ></video>
                  </v-col>
                </v-row>
                <v-row
                  v-if="video.meta.podcast_summarization"
                  justify="center"
                  align="center"
                  class="mb-3"
                >
                  <v-col cols="auto">
                    <v-btn
                      color="primary"
                      prepend-icon="mdi-download"
                      density="comfortable"
                    >
                      Download video
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      color="#1877F2"
                      prepend-icon="mdi-facebook"
                      density="comfortable"
                    >
                      Share on Facebook
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      color="#E1306C"
                      prepend-icon="mdi-instagram"
                      density="comfortable"
                    >
                      Share on Instagram
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item value="summary_object">
                <v-row v-if="video.meta.object_summarization">
                  <v-col>
                    <video
                      controls
                      style="object-fit: contain; width: 100%; height: 100%"
                      :src="video.meta.object_summarization[0]"
                    ></video>
                  </v-col>
                </v-row>
                <v-row
                  v-if="video.meta.object_summarization"
                  justify="center"
                  align="center"
                  class="mb-3"
                >
                  <v-col cols="auto">
                    <v-btn
                      color="primary"
                      prepend-icon="mdi-download"
                      density="comfortable"
                    >
                      Download video
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      color="#1877F2"
                      prepend-icon="mdi-facebook"
                      density="comfortable"
                    >
                      Share on Facebook
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      color="#E1306C"
                      prepend-icon="mdi-instagram"
                      density="comfortable"
                    >
                      Share on Instagram
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item value="custom_summary">
                <v-row justify="center" align="center" class="my-5">
                  <v-col cols="auto">
                    <v-btn
                      prepend-icon="mdi-auto-fix"
                      @click="() => moveToNewSummarizationPage()"
                      >Create custom summary</v-btn
                    >
                  </v-col>
                </v-row>
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
    <!-- End: Video Player Row -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white">
        <v-icon icon="mdi-television-guide" size="small" left></v-icon>
        Video Analysis
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="secondary"
        @click="hideAnalysis = !hideAnalysis"
        size="small"
      >
        <v-icon>{{ hideAnalysis ? "mdi-eye-off-outline" : "mdi-eye" }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-3"></v-divider>

    <!-- Card Component Row -->
    <v-row v-if="video && video.meta.processed">
      <v-col v-if="!hideAnalysis">
        <v-card variant="tonal">
          <v-tabs v-model="tab" bg-color="primary" color="white">
            <v-tab value="labels">Labels</v-tab>
            <v-tab value="objects">Object Tracking</v-tab>
            <v-tab value="explicit">Explicit Content</v-tab>
            <v-spacer></v-spacer>
            <v-tab value="debug">Debug</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="labels">
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(obj, index) in video.meta.labels"
                    :key="index"
                  >
                    <v-expansion-panel-title
                      class="text-capitalize font-weight-bold"
                    >
                      {{ obj.label }}
                      <span class="ml-2 font-weight-light">
                        {{ obj.segments.length }} segments</span
                      >
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-chip-group>
                        <v-chip
                          v-for="(timestamp, index) in obj.segments"
                          :key="index"
                          @click="
                            $refs.videoElement.currentTime = timestamp.startTime
                          "
                          >{{ secondsToTimestamp(timestamp.startTime) }} -
                          {{ secondsToTimestamp(timestamp.endTime) }}</v-chip
                        >
                      </v-chip-group>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>

              <v-window-item value="objects">
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(obj, index) in video.meta.objects"
                    :key="index"
                  >
                    <v-expansion-panel-title
                      class="text-capitalize font-weight-bold"
                    >
                      {{ obj.name }}
                      <span class="ml-2 font-weight-light">
                        {{ obj.timestamps.length }} segments</span
                      >
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-chip-group>
                        <v-chip
                          v-for="(timestamp, index) in obj.timestamps"
                          :key="index"
                          @click="
                            $refs.videoElement.currentTime = timestamp.startTime
                          "
                          >{{ secondsToTimestamp(timestamp.startTime) }} -
                          {{ secondsToTimestamp(timestamp.endTime) }}</v-chip
                        >
                      </v-chip-group>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>

              <v-window-item value="explicit">
                <v-row>
                  <v-col>
                    <v-chip
                      v-for="(obj, index) in video.meta.explicitContent"
                      :key="index"
                      @click="$refs.videoElement.currentTime = obj.offsetTime"
                      :color="getChipColor(obj.explicit_tag)"
                      class="mr-1 mb-1"
                    >
                      {{ secondsToTimestamp(obj.offsetTime) }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="debug">
                <pre
                  style="background-color: black; color: white; padding: 1rem"
                  >{{ JSON.stringify(video, null, 2) }}</pre
                >
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
    tabSummary: "summary_transcript",
    hightlight: 0,
    hideSummary: false,
    hideAnalysis: false,
  }),
  mounted() {
    this.fetchVideo();
  },
  computed: {},
  methods: {
    getChipColor(likeliness) {
      switch (likeliness) {
        case "VERY-LIKELY":
          return "#FF0000"; // red
        case "LIKELY":
          return "#FFA500"; // orange
        case "POSSIBLE":
          return "#FFFF00"; // yellow
        case "UNLIKELY":
          return "#00FF00"; // green
        default:
          return "#000000"; // black
      }
    },
    secondsToTimestamp(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    },
    moveToNewSummarizationPage() {
      this.$router.push(`${this.$route.params["fileName"]}/new-summarization`);
    },
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
        if (currentClipIndex < this.video.meta.objectSummary.length) {
          const clip = this.video.meta.objectSummary[currentClipIndex];
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
