<template>
  <div class="text-center">
    <v-dialog v-model="dialog" style="max-width: 60vh; min-width: 300px;">
      <template v-slot:activator="{ props }">
        <v-btn variant="outlined" class="ma-2" color="white" v-bind="props">Sign In</v-btn>
      </template>
      <v-card class="text-center">
        <div class="text-right">
          <v-btn icon="mdi-close" color="gray" variant="text" @click="dialog = false"></v-btn>
        </div>
        <v-card-title>
          <div class="text-h5 font-weight-bold">
            Iniciar Sesión
          </div>
        </v-card-title>
        <v-card-text>
          <component :is="steps[$store.getters['login/getCurrentPage']]" @onSubmit="submit"></component>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>

</template>
<script>
import SignInStepOne from "./SignInSteps/SignInStepOne.vue"
import SignInStepTwo from "./SignInSteps/SignInStepTwo.vue"
import SignInStepThree from "./SignInSteps/SignInStepThree.vue"
export default {
  components: {
    SignInStepOne,
    SignInStepTwo,
    SignInStepThree
  },
  data: () => ({
    dialog: false,
    steps: ["SignInStepOne", "SignInStepTwo", "SignInStepThree"],
    currentStepIndex: 0
  }),
  methods: {
    submit() {
      try {
        this.$store.commit("login/setPage", 0)
        this.dialog = false
        this.$router.push("/account")
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>