<script setup>
import { ref } from 'vue'
import imgUrl from '../assets/wrkout.png'

let username = ref('')
let password = ref('')
</script>
<template>
    <div class="">
        <div class="row"></div>
        <div
            class="row items-center"
            style="border: 1px solid black; height: 100vh"
        >
            <div class="col-md-4 col-xs-0"></div>
            <div class="col-md-4 col-xs-12">
                <q-card class="" flat bordered>
                    <q-card-section>
                        <div class="" style="height: 200px">
                            <q-img
                                :src="imgUrl"
                                style="height: 300px; width: 200px"
                                color="black"
                            />
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            class="loginInput"
                            filled
                            v-model="username"
                            label="Username"
                        />
                        <q-input
                            class="loginInput"
                            filled
                            v-model="password"
                            label="Password"
                        />
                    </q-card-section>

                    <q-card-actions class="justify-center">
                        <q-btn class="loginButton" size="md" color="black">
                            Login
                        </q-btn>
                    </q-card-actions>
                    <q-card-actions class="justify-center">
                        <q-btn flat class="loginButton" size="md" color="black">
                            Create account
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-0"></div>
        </div>
        <div class="row"></div>
    </div>
</template>
<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 350px
.loginInput
    margin-top: 5px
.loginButton
    margin: 5px
    width: 95%
</style>

