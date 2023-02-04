<template>
  <v-container fluid>
    <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
    <div class="ml-4 text-h4 text-primary">Account</div>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-textarea
            label="Bio"
            v-model.trim.lazy.number="bio"
            :rules="bioRules"
          ></v-textarea>
        </v-col>
      </v-row>

      <div class="mt2">
        <span class="mr2">{{ valid ? "Valid" : "Invalid" }}</span>

        <v-btn color="primary" @click.prevent="submit">Submit</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "AccountPage",
  data: () => ({}),
};
</script>
