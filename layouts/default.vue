<template>
  <v-layout>
    <ClientOnly>
      <!-- Navigation -->
      <v-navigation-drawer v-model="drawer" :temporary="false" color="surface">
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-cloud-upload-outline"
            title="Upload a video"
            value="myfiles"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-folder-play-outline"
            title="Gallery"
            value="shared"
            to="/gallery"
            v-only-logged
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-chart-box-outline"
            v-only-logged
            title="Usage & statistics"
            value="usage"
            to="/usage"
            class="title-bold"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-circle-outline"
            title="Account"
            value="starred"
            to="/account"
            :active="$route.name === 'account'"
            v-only-logged
            class="title-bold"
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list nav>
            <!--
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
            -->

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
      <v-app-bar
        style="background: linear-gradient(45deg, #6200ee, #7b1fa2)"
        :elevation="11"
      >
        <v-app-bar-nav-icon
          color="white"
          :icon="drawer ? 'mdi-menu-open' : 'mdi-menu'"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title class="font-weight-bold text-center">
          VIPPO
        </v-app-bar-title>
        <template v-slot:append>
          <SignIn v-if="!$store.getters['profile/getProfile'].logged" />
        </template>
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
