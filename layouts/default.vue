<template>
  <v-layout>
    <ClientOnly>
      <!-- Navigation -->
      <v-navigation-drawer v-model="drawer" :temporary="isMobile">
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard-outline"
            title="Servicios"
            value="myfiles"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-folder-play-outline"
            title="Galería"
            value="shared"
            to="/gallery"
            v-only-logged
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-credit-card-outline"
            v-only-logged
            title="Facturación"
            value="billing"
            to="/billing"
            class="title-bold"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-circle-outline"
            title="Cuenta"
            value="starred"
            to="/account"
            :active="$route.name === 'account'"
            v-only-logged
            class="title-bold"
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list nav>
            <v-list-item
              prepend-icon="mdi-xml"
              title="Playground"
              value="playground"
              to="/playground"
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-lifebuoy"
              title="Support Center"
              value="help"
            ></v-list-item>

            <v-list-item
              class="text-red"
              prepend-icon="mdi-logout"
              v-only-logged
              title="Log out"
              @click="logout"
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
        <v-spacer></v-spacer>
        <SignIn v-if="!$store.getters['profile/getProfile'].logged" />
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <slot />
      </v-main>
    </ClientOnly>
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
    },
    logout() {
      this.$store.dispatch("profile/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-list-item--nav .v-list-item-title {
  font-weight: 550;
}
</style>
