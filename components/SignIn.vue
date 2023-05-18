<template>
  <div class="text-center">
    <v-dialog v-model="dialog" style="max-width: 60vh; min-width: 300px">
      <template v-slot:activator="{ props }">
        <v-btn variant="outlined" class="ma-2" color="white" v-bind="props">Sign In</v-btn>
      </template>
      <v-card class="text-center">
        <div class="text-right">
          <v-btn icon="mdi-close" color="gray" variant="text" @click="dialog = false"></v-btn>
        </div>
        <v-card-title>
          <div class="text-h5 font-weight-bold">Welcome back</div>
        </v-card-title>
        <v-card-text>
          <component :is="steps[$store.getters['login/getCurrentPage']]" @onNewAccount="newAccount" @onSubmit="submit">
          </component>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SignInStepOne from "./SignInSteps/SignInStepOne.vue";
import SignInStepTwo from "./SignInSteps/SignInStepTwo.vue";
import SignUp from "./SignUp.vue"

export default {
  components: {
    SignInStepOne,
    SignInStepTwo,
    SignUp
  },
  data: () => ({
    dialog: false,
    steps: ["SignInStepOne", "SignInStepTwo", "SignUp"],
    currentStepIndex: 0,
  }),
  watch: {
    dialog() {
      console.log(this.dialog)
    }
  },
  methods: {
    newAccount() {
      this.$store.commit("login/setPage", 0);
      this.dialog = false;
    },
    submit(ev) {
      try {
        this.$store.commit("login/setPage", 0);
        this.dialog = false;
        this.$store.commit("profile/logIn");

        this.$router.push("/account");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
