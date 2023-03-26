<template>
    <v-dialog v-model="dialog" style="max-width: 65vw; min-width: 400px;">
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" class="ma-2" v-bind="props">Ver Detalles</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h4 class="text-primary">
                    Detalles del video
                </h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col md="6" sm="12">
                        <VideoPreview :url="currentVideo.url"></VideoPreview>
                    </v-col>
                    <v-col md="6" sm="12">
                        <v-expansion-panels>
                            <v-expansion-panel title="Categorías" v-if="currentVideo.videoAnalysis.labels.length">
                                <template #text>
                                    <ul>
                                        <li v-for="l in currentVideo.videoAnalysis.labels">
                                            {{ l.entity.description }}
                                        </li>
                                    </ul>
                                </template>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-list>
                            <v-list-item v-if="currentVideo">
                                <v-list-item-title v-text="'Contenido Explícito +18'"></v-list-item-title>
                                <template #prepend>
                                    <v-icon icon="mdi-alert" color="red"></v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ["videoIndex"],
    computed: {
        currentVideo() {
            return this.$store.getters['gallery/getVideoByIndex'](this.videoIndex)
        }
    },
    data: () => ({
        dialog: false,
    })
}
</script>