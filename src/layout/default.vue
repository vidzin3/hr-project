<script setup>
import {computed, onMounted, ref} from 'vue'
import drawerContent from './components/drawerContent.vue';
import navItem from '@/layout/components/navItem';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/store/auth.module';
import Profile from './components/profile.vue';
import logo from '@/assets/image/logo.png'

const drawer = ref(null)
const store = useAuthStore()
const title = computed(() => {
    return localStorage.getItem("label_application")
})

const onDrawer = () => {
    return drawer.value = !drawer.value
}

onMounted(() => {
    if(store._authenticated){
        store.verify()
    }
})
</script>
<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" style="background: rgb(var(--v-theme-background))">
            <div class="text-center pa-2">
                <v-img cover :src="logo"></v-img>
            </div>
            <drawerContent :nav-item="navItem" />
        </v-navigation-drawer>
        <v-app-bar style="background: transparent;" elevation="0" class="py-1">
            <div class="mx-3 pa-0 w-100 d-flex align-center bg-white rounded-sm border border-black">
                <v-app-bar-nav-icon @click="onDrawer"></v-app-bar-nav-icon>   
                <v-app-bar-title style="font-family: muol;">{{ title ?? 'ប្រព័ន្ធគ្រប់គ្រងធន់ធានមនុស្ស' }}</v-app-bar-title>
                <Profile></Profile>             
            </div>
            
        </v-app-bar>
        <v-main>
            <div class="pa-3">
                <RouterView></RouterView>
            </div>
        </v-main>
        <VFooter
            app
            class=""
            style="background: transparent;"
        >
            <div class="mx-0 pa-2 w-100 d-flex align-center bg-white rounded-sm border border-black">
                &copy; {{ new Date().getFullYear() }} - Made by Small Developer 💙            
            </div>
        </VFooter>
    </v-app>
</template>