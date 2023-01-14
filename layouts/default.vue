<template>
  <v-layout>
    <!-- Application Bar -->
    <v-app-bar color="primary">
      <v-spacer></v-spacer>
      <v-app-bar-title class="font-weight-bold">V I P P O</v-app-bar-title>
    </v-app-bar>
    <!-- Navigation -->
    <v-navigation-drawer expand-on-hover rail>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Servicios"
          value="myfiles"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder-play-outline"
          title="Galería"
          value="shared"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-credit-card-outline"
          title="Facturación"
          value="billing"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-circle-outline"
          title="Cuenta"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main Content -->
    <v-main >
      <slot />
    </v-main>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
  }),
};
</script>
