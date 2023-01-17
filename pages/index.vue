<template>
  <v-container fluid>
    <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
    <div class="ml-4 text-h4 text-primary">Services</div>
    <v-row class="mt-5">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <v-card
          class="mx-1 card-hover"
          elevation="8"
          @click="$router.push('/servicios')"
          :mouseover="(scaleCard = true)"
          :mouseout="(scaleCard = false)"
        >
          <v-card-text class="text-center">
            <v-icon size="50" color="primary">
              mdi-home-outline
            </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    scaleCard: false,
  }),
};
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.02);
  transition: all 0.3s ease;
}
</style>
