<template>
  <v-container fluid>
    <!-- Page Breadcrumbs -->
    <v-breadcrumbs
      :items="['VIPPO', 'Account']"
      bg-color="#293040ff"
      class="text-body-2 text-white"
    ></v-breadcrumbs>
    <!-- End: Page Breadcrumbs -->
    <!-- Page Toolbar -->
    <v-toolbar color="background" class="text-primary mt-4">
      <v-toolbar-title class="ml-1 text-h5 font-weight-bold text-white">
        Account
      </v-toolbar-title>
    </v-toolbar>
    <!-- End: Page Toolbar -->
    <!-- Personal Details -->
    <client-only>
      <v-card
        class="mt-4"
        prepend-icon="mdi-account-outline"
        title="Personal Details"
      >
        <v-form ref="form" @submit.prevent="submitProfile" validate-on="submit">
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-list-subheader>First Name</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="First Name"
                  v-model="firstname"
                  :rules="[(v) => !!v || 'El nombre es obligatorio']"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-list-subheader>Last Name</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="Last Name"
                  v-model="lastname"
                  :rules="[(v) => !!v || 'El apellido es obligatorio']"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-list-subheader>Email Address</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="Email Address"
                  :model-value="$store.getters['profile/getProfile'].email"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <!--
            <v-row>
              <v-col cols="4">
                <v-list-subheader>New Password</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="New Password"
                  :type="showPassword ? 'text' : 'password'"
                  append-icon="mdi-eye"
                  @click:append="showPassword = !showPassword"
                  v-model="newPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            -->
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              class="px-5"
              color="secondary"
              type="submit"
              prepend-icon="mdi-content-save-move-outline"
              >Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-card
        class="mt-4"
        prepend-icon="mdi-account-outline"
        title="Change Password"
      >
        <v-form ref="form" @submit.prevent="submitProfile" validate-on="submit">
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-list-subheader>Current Password</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="Current Password"
                  :type="showPassword ? 'text' : 'password'"
                  append-icon="mdi-eye"
                  @click:append="showPassword = !showPassword"
                  v-model="newPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-list-subheader>New Password</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="New Password"
                  :type="showPassword ? 'text' : 'password'"
                  append-icon="mdi-eye"
                  @click:append="showPassword = !showPassword"
                  v-model="newPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-list-subheader>Repeat New Password</v-list-subheader>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  label="Repeat New Password"
                  :type="showPassword ? 'text' : 'password'"
                  append-icon="mdi-eye"
                  @click:append="showPassword = !showPassword"
                  v-model="newPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              class="px-5"
              color="secondary"
              type="submit"
              prepend-icon="mdi-content-save-move-outline"
              >Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </client-only>
  </v-container>
</template>

<script setup>
definePageMeta({
  middleware: "check-auth",
});
</script>
<script>
export default {
  name: "AccountPage",
  data: () => ({
    firstname: "",
    lastname: "",
    newPassword: "",
    showPassword: false,
  }),
  beforeMount() {
    this.firstname = this.$store.getters["profile/getProfile"].firstname;
    this.lastname = this.$store.getters["profile/getProfile"].lastname;
  },
  methods: {
    async submitProfile() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      try {
        await this.$store.dispatch("profile/updateProfile", {
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
        });
        this.$swal.fire(
          "Update acccount",
          "Your account has just updated",
          "success"
        );
      } catch (error) {
        this.$swal.fire(
          "Update acccount",
          "There was a problem during the account update",
          "error"
        );
      }
    },
  },
};
</script>
