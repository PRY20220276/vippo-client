<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Billing']"
      bg-color="indigo-lighten-5"
      class="text-body-2"
    >
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
    <v-row class="mt-5">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <v-card
          class="mx-1 card-hover"
          elevation="8"
          @click="$router.push('/servicios')"
        >
          <v-card-text class="text-center">
            <v-icon size="50" color="primary"> mdi-home-outline </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BillingPage",
  data: () => ({}),
};
</script>
