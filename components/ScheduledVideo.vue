<template>
    <v-card>
        <v-card-title>
            <div style="display:flex;align-items: center;justify-content: space-between;">
                <div>
                    <div class="text-h6"> {{ title }}</div>
                </div>
                <div>
                    <div class="text-subtitle-2">{{ createdAt }}</div>

                </div>
            </div>
        </v-card-title>
        <v-card-text>
            <v-chip v-for="s in services" :color="`${s}_service_tag`" class="infinite-loading ">{{ s }}</v-chip>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            value: ""
        },
        services: {
            type: Array,
            value: []
        },
        createdAt: {
            type: String,
            value: ""
        }
    }
}
</script>
<style lang="scss">
@keyframes infinite-loading-animation {
    0% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.95;
    }
}


.infinite-loading {
    animation: infinite-loading-animation 1s linear infinite alternate;
}
</style>