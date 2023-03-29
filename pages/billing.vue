<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs :items="['VIPPO', 'Billing']" bg-color="indigo-lighten-5" class="text-body-2">
    </v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">Billing</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-rotate-right" variant="outlined">
        Change
      </v-btn>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <ClientOnly>
      <v-row class="mt-5">
        <v-col cols="4">
          <v-card class="mx-1 card-hover">
            <v-card-title>Storage Status</v-card-title>
            <v-card-text>
              <v-row>
                <v-col style="text-align: center;">
                  <v-progress-circular v-model="consumedStorage" color="primary" size="60"></v-progress-circular>
                </v-col>
                <v-col>
                  <p>Capacity: {{ capacity }}</p>
                  <p>Used: {{ used }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>

<script>
export default {
  name: "BillingPage",
  data: () => ({
    consumedStorage: 0,
    capacity: "",
    used: ""

  }),
  async beforeMount() {
    const response = await this.$store.dispatch("gallery/getStats")
    this.consumedStorage = (response.totalStorageUsed / response.maxStorageSize) * 100
    this.used = response.usedGB;
    this.capacity = response.maxGB;
  }
};
</script>
