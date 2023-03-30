<template>
    <v-card>
        <v-card-text>
            <div class="skeleton skeleton-text skeleton-text__picture"></div>
            <div class="skeleton skeleton-text skeleton-text__body"></div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {


    0% {
        background-color: hsl(200, 20%, 80%);
    }

    100% {
        background-color: hsl(200, 20%, 95%);
    }
}

.skeleton-text {
    width: 100%;
    height: 0.7rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
}

.skeleton-text__body {
    width: 75%;
    height: 1.2rem;
}

.skeleton-text__picture {
    width: 100%;
    height: 8rem;
}

.skeleton-footer {
    width: 30%;
}
</style>