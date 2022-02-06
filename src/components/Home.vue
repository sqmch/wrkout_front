<template>
    <q-layout
        view="lHh lpr lFf"
        container
        style="height: 100vh"
        class="rounded-borders"
    >
        <q-header>
            <q-toolbar class="toolBar">
                <q-btn
                    @click="drawer = !drawer"
                    flat
                    round
                    dense
                    icon="menu"
                    class="q-mr-sm"
                />
                <div class="titleText">wrkout</div>

                <q-toolbar-title></q-toolbar-title>
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

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="analytics" />
                        </q-item-section>

                        <q-item-section> Stats </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <q-page class="q-pa-md">
                <router-view></router-view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import imgUrl from '../assets/wrkoutBlueCropped.png'

let drawer = ref(false)
let miniState = ref(false)
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap')

.toolBar
    background-color: #1d1d1d

.titleText
    font-family: 'Montserrat',
</style>
