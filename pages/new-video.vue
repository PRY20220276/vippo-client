<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Services', 'New Video']"
      bg-color="indigo-lighten-5"
      class="text-body-2"
    >
    </v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">New Video</v-toolbar-title>
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
    <v-card>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              placeholder="john@google.com"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              This is the email you will use to login to your Vuetify account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field label="Password" type="password"></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
      <!-- Card action buttons -->
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 3" color="primary" variant="flat" @click="step++">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- End: Page Content -->
  </v-container>
</template>

<script>
export default {
  name: "NewVideoPage",
  data: () => ({
    step: 1,
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
  },
};
</script>
