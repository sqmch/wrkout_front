
<template>
    <div class="">
        <div class="row"></div>
        <div
            class="row items-center"
            style="border: 1px solid black; height: 100vh"
        >
            <div class="col-md-4 col-xs-0"></div>
            <div class="col-md-4 col-xs-12">
                <q-card flat class="">
                    <q-form
                        ref="loginForm"
                        @submit.prevent.stop="onSubmit"
                        class="q-gutter-md q-validation-component"
                    >
                        <div>
                            <div style="height: 150px">
                                <q-img
                                    :src="imgUrl"
                                    style="height: 200px; width: 200px"
                                    color="black"
                                />
                            </div>
                            <div class="row justify-center">
                                <q-input
                                    class="loginInput"
                                    filled
                                    v-model="username"
                                    label="Username"
                                    lazy-rules
                                    :rules="usernameRules"
                                />
                            </div>
                            <div class="row justify-center">
                                <q-input
                                    filled
                                    :type="isPwd ? 'password' : 'text'"
                                    class="loginInput"
                                    v-model="password"
                                    label="Password"
                                    lazy-rules
                                    :rules="passwordRules"
                                    ><template
                                        v-if="password.length > 0"
                                        v-slot:append
                                    >
                                        <q-icon
                                            :name="
                                                isPwd
                                                    ? 'visibility_off'
                                                    : 'visibility'
                                            "
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                        /> </template
                                ></q-input>
                            </div>

                            <div class="row justify-center">
                                <q-btn
                                    type="submit"
                                    class="loginButton text-black text-bold"
                                    size="md"
                                    color="blue-4"
                                    label="Login"
                                />
                            </div>
                            <div class="row justify-center">
                                <q-btn
                                    to="/createaccount"
                                    class="loginButton"
                                    flat
                                    size="md"
                                    color="grey-2"
                                    label="Create account"
                                />
                            </div>
                        </div>
                    </q-form>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-0"></div>
        </div>
        <div class="row"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import imgUrl from '../assets/wrkoutBlue.png'
import axios from 'axios'
import router from '../router'
import { useAuthStore } from '../store'
import { useQuasar } from 'quasar'

let username = ref('')
let password = ref('')
let token = ref('')
let isPwd = ref(true)

const loginForm = ref(null)
const store = useAuthStore()

const $q = useQuasar()

let usernameRules = ref([
    (val) => (val !== null && val !== '') || 'Please enter an username',
    (val) => val.length >= 3 || 'Username must contain at least 3 characters',
])
let passwordRules = ref([
    (val) => !!val || 'Please enter a password',
    (val) => val.length >= 6 || 'Password must contain at least 6 characters',
])

function onSubmit() {
    loginForm.value.validate()
    login()
}

function login() {
    axios
        .post('http://localhost:8000/login', {
            username: username.value,
            password: password.value,
        })
        .then(function (response) {
            console.log(response.data)
            store.setToken(response.data)
            console.log(store.token)
            router.push('/')
        })
        .catch(function (error) {
            console.log(error)
            $q.notify({
                type: 'negative',
                message:
                    'Login failed, please check your username or password.',
            })
        })
}
</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 350px
.loginInput
    margin-top: 10px
    width: 95%
.loginButton
    width: 95%
    margin-top: 13px
    height: 5vh
</style>

