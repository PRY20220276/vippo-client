<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Account']"
      bg-color="indigo-lighten-5"
      class="text-body-2"
    ></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5">Account</v-toolbar-title>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <!-- Personal Details -->
    <v-card
      class="mt-4"
      prepend-icon="mdi-account-outline"
      title="Personal Details"
    >
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-list-subheader>First Name</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field
                label="First Name"
                model-value="Jhon"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-list-subheader>Last Name</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field label="Last Name" model-value="Doe"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-list-subheader>Email Address</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field
                label="Email Address"
                model-value="jhon.doe@gmail.com"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            class="px-5"
            prepend-icon="mdi-content-save-move-outline"
            >Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <!-- Account Security -->
    <v-card
      class="mt-4"
      prepend-icon="mdi-account-lock-outline"
      title="Account Security"
    >
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-list-subheader>Current Password</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field
                type="password"
                label="Current Password"
                model-value="jhondoesuperpassword"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-list-subheader>New Password</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field
                type="password"
                label="New Password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-list-subheader>Confirm New Password</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field
                type="password"
                label="Confirm New Password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            class="px-5"
            prepend-icon="mdi-content-save-move-outline"
            >Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AccountPage",
  data: () => ({}),
};
</script>
