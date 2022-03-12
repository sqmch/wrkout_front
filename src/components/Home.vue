<template>
    <q-layout
        view="hHh Lpr lff"
        container
        style="height: 100vh"
        class="rounded-borders"
    >
        <q-header>
            <q-toolbar class="toolBar">
                <q-btn @click="drawer = !drawer" flat round dense icon="menu" />
                <!-- <q-separator dark vertical inset />-->
                <q-btn
                    class="q-ma-md"
                    flat
                    round
                    dense
                    icon="arrow_back"
                    @click="goBack"
                ></q-btn>

                <div class="text-subtitle1">
                    {{ generalStore.toolbarTitle }}
                </div>
                <!-- <q-separator dark vertical inset />

                <q-btn round flat icon="logout" @click="logout"></q-btn>-->
            </q-toolbar>
        </q-header>

        <q-drawer
            show-if-above
            v-model="drawer"
            :width="250"
            :breakpoint="500"
            :mini="miniState"
            @mouseover="miniState = false"
            @mouseout="miniState = true"
        >
            <q-scroll-area class="fit">
                <q-list padding class="menu-list">
                    <q-item clickable v-ripple to="/dashboard">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>

                        <q-item-section> Dashboard </q-item-section>
                    </q-item>

                    <q-item active clickable v-ripple to="/routines">
                        <q-item-section avatar>
                            <q-icon name="list" />
                        </q-item-section>

                        <q-item-section> Routines </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="/stats">
                        <q-item-section avatar>
                            <q-icon name="analytics" />
                        </q-item-section>

                        <q-item-section> Stats </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="logout" />
                        </q-item-section>

                        <q-item-section> Logout </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore, useGeneralStore } from '../store'
import router from '../router'

const generalStore = useGeneralStore()
const authStore = useAuthStore()

let drawer = ref(false)
let miniState = ref(false)

function logout() {
    authStore.token = null
    router.push('/login')
}
function goBack() {
    router.go(-1)
}
onMounted(() => {
    generalStore.getRoutines()
})
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;300&family=Montserrat:wght@300&display=swap')
.toolBar
    background-color: #1d1d1d
</style>


