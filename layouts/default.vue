<template>
  <v-layout>
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" :temporary="isMobile">
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
      <template v-slot:append>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-lifebuoy"
            title="Centro de Ayuda"
            value="help"
          ></v-list-item>
          <v-list-item
            class="text-red"
            prepend-icon="mdi-logout"
            title="Cerrar Sesión"
            value="logout"
          ></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <!-- Application Bar -->
    <v-app-bar color="primary">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title
        class="text-center font-weight-bold"
        style="letter-spacing: 0.15em"
        >VIPPO</v-app-bar-title
      >
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    isMobile: false,
  }),
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.matchMedia("(max-width: 600px)").matches;
      console.log("Checking screen size for " + this.isMobile);
    },
  },
};
</script>
