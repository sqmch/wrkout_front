<script setup>
import { useQuasar } from 'quasar'
import Axios from 'axios'

Axios.defaults.baseURL = import.meta.env.VITE_API_URL
const q = useQuasar()
q.dark.set(true)
</script>

<template>
    <q-layout>
        <q-page-container class="app"
            ><q-page> <router-view></router-view></q-page>
        </q-page-container>
    </q-layout>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap')

.app
    font-family: 'Montserrat', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    margin-top: 0px

body.body--dark
    background: #1d1d1d
</style>
