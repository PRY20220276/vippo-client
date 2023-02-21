<template>
    <p class="text-medium-emphasis pb-2">
        Enviaremos un código a tu correo
    </p>
    <v-form ref="form" lazy-validation>
        <v-text-field label="Email" color="primary" v-model="email" :rules="rules"></v-text-field>
    </v-form>
    <v-btn color="primary" block class="my-2" rounded="lg" variant="flat" @click.stop="onClick">Continuar</v-btn>
    <v-btn color="gray" block class="my-2" rounded="lg" variant="flat"
        @click.stop="$store.dispatch('login/backPage')">Cancelar</v-btn>

</template>
<script >
export default {
    data: () => ({
        email: '',
        rules: [
            v => !!v || 'El correo es obligatorio',
            v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido',]
    }),
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            return valid
        },
        async onClick() {
            const isValid = await this.validate()
            if (isValid) {
                this.$store.dispatch("login/submitEmail", this.email)
                this.$refs.form.reset()
            }
        }
    }
}
</script>