<template>
    <v-dialog v-model="showSummarize" style="max-width: 60vh; min-width: 400px">
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="1">
                        <v-icon icon="mdi-auto-fix" size="26"></v-icon>
                    </v-col>
                    <v-col>
                        Summarization
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                Yeah, like fairly frequently, I don't know, I was just on this expedition in the jungle and guy a nose like
                a
                National Geographic TV show thing and enough resold the wall, we put up just just because the Tiber Rock we
                were
                on.
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-container fluid v-if="video">
        <v-row class="mt-5" justify="center">
            <v-col style="text-align: center;">
                <video ref="current_podcast" :src="video.downloadPath" controls
                    style="object-fit: contain;width: 100%;height: 100%;"></video>
            </v-col>
        </v-row>

        <v-container style="overflow-y: scroll; height: 35vw;">
            <template v-if="currentStep === 'index'">
                <v-row justify="space-between" align="center">

                    <v-col>
                        <div style="text-align: end;">
                            <v-btn @click="moveToCreateSummarizationSection">Create summarization</v-btn>
                        </div>

                    </v-col>
                </v-row>
            </template>
            <template v-if="currentStep === 'index'">
                <div style="overflow-y: scroll; height: 35vw;">
                    <v-row v-for=" (t, index) in video.meta.transcript " class=" my-3">
                        <v-card width="100%">
                            <v-card-subtitle>{{ formatSeconds(t.startTime) }} -> {{ formatSeconds(t.endTime)
                            }}</v-card-subtitle>
                            <v-card-text>
                                <v-row align="center">
                                    <v-col cols="1" class="text-center"><v-btn @click="setVideoTimestamp(t.startTime)"
                                            icon="mdi-play"></v-btn></v-col>
                                    <v-col>{{ t.transcription }}</v-col>
                                    <v-col cols="1">
                                        <v-checkbox color="primary" v-model="selectedTranscriptions" label=""
                                            :value="index"></v-checkbox>
                                    </v-col>
                                </v-row>

                            </v-card-text>

                        </v-card>
                    </v-row>
                </div>

            </template>
            <template v-if="currentStep === 'create-summarization'">
                <v-row justify="space-between" align="center">
                    <v-col>
                        <div class="text-h5 text-primary">New Summarization</div>
                    </v-col>
                    <v-col>
                        <div style="display:flex; justify-content: right; ">
                            <v-btn rounded="xs" color="grey-lighten-5" class="mx-1"
                                @click="currentStep = 'index'">Cancel</v-btn>
                            <v-btn rounded="xs" class="mx-1" @click="createSummarization">Create</v-btn>
                        </div>


                    </v-col>
                </v-row>
            </template>

            <template v-if="currentStep === 'create-summarization'">
                <v-form ref="new-summarization-form">
                    <v-row>
                        <v-text-field label="Chapter name" color="primary" v-model="newSummarizationTitle"
                            :rules="[v => !!v || 'Chapter is required']"></v-text-field>
                    </v-row>
                </v-form>
                <div style="overflow-y: scroll; height: 25vw;">
                    <v-row v-for=" tIndex in selectedTranscriptions " class=" my-3">
                        <v-card width="100%">
                            <v-card-subtitle>{{ formatSeconds(video.meta.transcript[tIndex].startTime) }} -> {{
                                formatSeconds(video.meta.transcript[tIndex].endTime)
                            }}</v-card-subtitle>
                            <v-card-text>
                                <v-row align="center">
                                    <v-col cols="1" class="text-center"><v-btn
                                            @click="setVideoTimestamp(video.meta.transcript[tIndex].startTime)"
                                            icon="mdi-play"></v-btn></v-col>
                                    <v-col>{{ video.meta.transcript[tIndex].transcription }}</v-col>
                                </v-row>
                            </v-card-text>

                        </v-card>
                    </v-row>
                </div>

            </template>
        </v-container>
    </v-container>
</template>
  
<script>
import format from "format-duration"
import { CustomSummaryService } from "../../../services/custom-summary"

export default {
    name: "PlaygroundPage",

    data: () => ({
        newSummarizationTitle: "",
        showSummarize: false,
        currentStep: "index",
        selectedTranscriptions: [],
        video: null
    }),
    beforeMount() {
        this.fetchVideo()
    },
    fetch(context) {
        console.log(context)
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
                    this.video = res;
                })
                .catch(() => {
                    this.$router.push("/gallery");
                });
        },
        moveToCreateSummarizationSection() {
            if (!this.selectedTranscriptions.length) {
                this.$swal.fire("Create Summary", "You have to select at least one transcript", "error")
                return;
            }
            this.currentStep = 'create-summarization'

        },
        formatSeconds(seconds) {
            return format(seconds * 1e3)
        },
        setVideoTimestamp(t) {
            this.$refs.current_podcast.pause()
            this.$refs.current_podcast.currentTime = t
            this.$refs.current_podcast.play()
        },
        async createSummarization() {
            const { valid } = await this.$refs["new-summarization-form"].validate()
            await CustomSummaryService.instance.createCustomSummary({ chapter: this.newSummarizationTitle, summary: this.selectedTranscriptions.map(index => this.video.meta.transcript[index]), fileName: this.$route.params.fileName })
            if (valid) {
                this.$swal.fire("Create Summary", "Your summary is being processed!", "success")
            }
            this.$refs["new-summarization-form"].reset()
        }
    }
};
</script>
  