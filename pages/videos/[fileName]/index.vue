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
      <v-toolbar-title class="ml-1 text-h5"
        ><v-icon icon="mdi-play-box-outline" size="small"></v-icon>
        Video Playback
      </v-toolbar-title>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <!-- Video Player Row -->
    <v-row v-if="video">
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
              :src="video.downloadPath"
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
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">
        <v-icon icon="mdi-content-cut" size="small"></v-icon>
        Video Summarization</v-toolbar-title
      >
    </v-toolbar>

    <!-- Card Component Row -->
    <v-row v-if="video && video.meta.processed">
      <v-col>
        <v-card>
          <v-tabs v-model="tabSummary" bg-color="primary" color="white">
            <v-tab value="summary_transcript">Summary #1 (Podcast)</v-tab>
            <v-tab value="summary_object">Summary #2 (Scene)</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tabSummary">
              <v-window-item value="summary_object">
                <v-btn @click="playSummary">
                  Play Summary {{ hightlight }}/{{
                    video.meta.objectSummary.length
                  }}
                </v-btn>
                <br />
                {{ video.meta.objectSummary || [] }}
              </v-window-item>

              <v-window-item value="summary_transcript">
                <v-row justify="end">
                  <v-col>
                    <v-btn
                      size="small"
                      prepend-icon="mdi-auto-fix"
                      @click="() => moveToNewSummarizationPage()"
                      >Create custom summary</v-btn
                    >
                  </v-col>
                </v-row>
                <div style="width: 100%; height: 300px">
                  <video
                    controls
                    style="object-fit: contain; width: 100%; height: 100%"
                    src="https://storage.cloud.google.com/vippo-video-maker/podcast-podcast_auto_summarization.mp4/sd.mp4"
                  ></video>
                </div>
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
      <v-toolbar-title class="ml-1 text-h5">
        <v-icon icon="mdi-television-guide" size="small"></v-icon>
        Video Analysis</v-toolbar-title
      >
    </v-toolbar>

    <!-- Card Component Row -->
    <v-row v-if="video && video.meta.processed">
      <v-col>
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" color="white">
            <v-tab value="labels">Labels</v-tab>
            <v-tab value="objects">Object Tracking</v-tab>
            <v-tab value="explicit">Explicit Content</v-tab>
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
                            this.$refs.videoElement.currentTime =
                              timestamp.startTime
                          "
                          >{{ timestamp.startTime }} -
                          {{ timestamp.endTime }}</v-chip
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
                        {{ obj.timestamps.length }} timestamps</span
                      >
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-chip-group>
                        <v-chip
                          v-for="(timestamp, index) in obj.timestamps"
                          :key="index"
                          @click="
                            this.$refs.videoElement.currentTime =
                              timestamp.startTime
                          "
                          >{{ timestamp.startTime }} -
                          {{ timestamp.endTime }}</v-chip
                        >
                      </v-chip-group>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>

              <v-window-item value="explicit">
                {{ video.meta.explicitContent || [] }}
                <v-expansion-panels>
                  <v-expansion-panel
                    title="Title"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
                  >
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>

              <v-window-item value="transcript">
                {{ video.meta.transcript || [] }}
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
  }),
  mounted() {
    this.fetchVideo();
  },
  methods: {
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
