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
                <img
                    class="absolute-center"
                    :src="imgUrl"
                    style="height: 27.78px; width: 125px"
                />

                <q-toolbar-title></q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" :width="200" :breakpoint="500">
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

let drawer = ref(null)
</script>

<style lang="sass" scoped>
.toolBar
    background-color: #1d1d1d
</style>
