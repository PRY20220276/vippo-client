<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Services']"
      bg-color="indigo-lighten-5"
      class="text-body-2"
    >
    </v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">Services</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        label="Search..."
        variant="underlined"
        prepend-icon="mdi-magnify"
        v-model="search"
      ></v-text-field>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <!-- Page Content -->
    <v-row class="mt-5">
      <v-col v-for="service in services" :key="service.icon" cols="12" sm="4">
        <v-card
          class="mx-1 card-hover"
          elevation="7"
          @click="$router.push('/new-video')"
          :mouseover="(scaleCard = true)"
          :mouseout="(scaleCard = false)"
        >
          <v-card-subtitle
            class="mt-4 text-primary font-weight-bold text-subtitle-2 text-uppercase"
          >
            <v-icon start>{{ service.icon }}</v-icon>
            {{ service.title }}
          </v-card-subtitle>
          <v-card-text>{{ service.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- End: Page Content -->
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  data: () => ({
    search: "",
    scaleCard: false,
    services: [
      {
        icon: "mdi-content-cut",
        title: "Detección de Tomas",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien ante, imperdiet consequat mauris sit amet, volutpat commodo risus.",
      },
      {
        icon: "mdi-transcribe",
        title: "Transcripción a Texto",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien ante, imperdiet consequat mauris sit amet, volutpat commodo risus.",
      },
      {
        icon: "mdi-cancel",
        title: "Detectar contenido explicito",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien ante, imperdiet consequat mauris sit amet, volutpat commodo risus.",
      },
      {
        icon: "mdi-arrow-collapse",
        title: "Redimensionar Video",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien ante, imperdiet consequat mauris sit amet, volutpat commodo risus.",
      },
      {
        icon: "mdi-face-man",
        title: "Detectar rostros",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien ante, imperdiet consequat mauris sit amet, volutpat commodo risus.",
      },
    ],
  }),
  head() {
    return {
      title: "Inicio",
    };
  },
};
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.02);
  transition: all 0.3s ease;
}
</style>
