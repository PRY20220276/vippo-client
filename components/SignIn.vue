<template>
    <div class="text-center">
        <v-dialog v-model="dialog" style="max-width: 60vh; min-width: 300px;">
            <template v-slot:activator="{ props }">
                <v-btn variant="outlined" class="ma-2" color="white" v-bind="props">Sign In</v-btn>
            </template>
            <component :is="steps[currentStepIndex]" @submit="onClickTab()" @closeDialog="close()"></component>
        </v-dialog>

    </div>

</template>
<script>
import SignInStepOne from "./SignIn/SignInStepOne.vue"
import SignInStepTwo from "./SignIn/SignInStepTwo.vue"
export default {
    components: {
        SignInStepOne,
        SignInStepTwo
    },
    data: () => ({
        dialog: false,
        steps: ["SignInStepOne", "SignInStepTwo"],
        currentStepIndex: 0
    }),
    methods: {
        onClickTab() {
            //alert("Signin Passwordless")
            this.currentStepIndex++
        },
        close() {
            //this.dialog = false
        }
    }
}
</script>