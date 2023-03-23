<template>
    <v-form ref="form" lazy-validation>
        <v-text-field label="Email" color="primary" v-model="email" :rules="rules"></v-text-field>
        <v-text-field label="Contraseña" color="primary" v-model="password" type="password"
            :rules="passwordRules"></v-text-field>

    </v-form>
    <v-btn color="primary" block class="my-2" rounded="lg" variant="flat" @click.stop="onClick">Continuar</v-btn>
    <v-btn color="gray" block class="my-2" rounded="lg" variant="flat"
        @click.stop="$store.dispatch('login/backPage')">Cancelar</v-btn>
</template>
<script >
export default {
    data: () => ({
        email: '',
        password: '',
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
        async onClick() {
            const isValid = await this.validate()
            if (isValid) {
                try {
                    await this.$store.dispatch("login/submitEmail", { email: this.email, password: this.password })
                    this.$store.commit("profile/setProfile", { email: this.email })
                    this.$refs.form.reset()
                    this.$emit("onSubmit", "submitted")
                } catch (error) {
                    alert("Credenciales invalidas")
                    this.$refs.form.reset()
                }

            }
        }
    }
}
</script>