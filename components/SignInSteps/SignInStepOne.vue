<template>
  <p class="text-medium-emphasis">
    Access your VIPPO account with different providers. Select one option to
    continue.
  </p>
  <div>
    <v-btn block color="primary" class="my-2" rounded="lg" variant="flat" @click.stop="onClick()"
      prepend-icon="mdi-email-outline">
      Sign in with Email
    </v-btn>
    <a href="#" style="font-size: 0.8rem;" @click.prevent="() => goToSignUp()">Don't you have an account? Get one!</a>
    <p class="text-caption mt-5">
      By using Vippo, you agree to our<br /><a href="#">Privacy Policy</a> and
      <a href="#">Terms of Use</a>.
    </p>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    goToSignUp() {
      this.$store.commit("login/setPage", 2);
    },
    onClick() {
      this.$store.dispatch("login/nextPage");
    },
  },
};
</script>
