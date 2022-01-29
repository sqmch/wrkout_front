<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <!-- /src/layouts/User.vue -->

    <q-layout>
        <!-- this is where the Pages are injected -->
        <q-page-container class="app"
            ><q-page> <router-view></router-view></q-page>
        </q-page-container>
    </q-layout>
</template>

<style>
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
}
</style>
