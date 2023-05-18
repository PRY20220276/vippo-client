<template>
    <p class="text-medium-emphasis">
        Register new account with your email
    </p>
    <v-form ref="form" @submit.prevent="submit" class="my-2">
        <v-text-field label="Email" color="primary" v-model="email" :rules="rules"></v-text-field>
        <v-text-field label="Password" color="primary" v-model="password" type="password"
            :rules="passwordRules"></v-text-field>
        <v-btn color="primary" type="submit" block class="my-2" rounded="lg" variant="flat">Register</v-btn>
        <v-btn color="gray" block class="my-2" rounded="lg" variant="flat"
            @click.stop="$store.dispatch('login/backPage')">Cancel</v-btn>
    </v-form>
</template>
<script>
export default {
    data: () => ({
        password: "",
        email: "",
        rules: [
            v => !!v || 'El correo es obligatorio',
            v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido',],
        passwordRules: [
            v => !!v || 'La contraseña es obligatoria']
    }),
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            return valid
        },
        async submit() {
            const isValid = await this.validate()
            if (!isValid) return
            try {
                //await this.$store.dispatch("login/signUp", { password: this.password, email: this.email })
                this.$swal.fire("Register account", "Your account has just registered!", "success")
                this.$refs.form.reset()
            } catch (error) {
                this.$swal.fire("Register account", "There was a problem during account creation!", "error")
                this.$refs.form.reset()
            }
            this.$emit("onNewAccount")

        }
    }


}
</script>