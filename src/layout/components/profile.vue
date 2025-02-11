<script setup>
import { useAuthStore } from '@/store/auth.module';

const store = useAuthStore()

const onLogout = () => {
    store.logout()
}

</script>
<template>
    <v-menu>
        <template v-slot:activator="{props}">
            <v-btn 
                size="x-small"
                class="bg-light-blue-darken-2 mx-2"
                v-bind="props"
                icon
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list class="ma-0 pa-0">
            <v-list-item to="/setting/user/profile" style="min-height: 0px;">
                <template v-slot:prepend>
                    <v-icon color="info">mdi-account-circle</v-icon>
                </template>
                Profile
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="onLogout" style="min-height: 0px;">
                <template v-slot:prepend>
                    <v-icon color="warning">mdi-logout</v-icon>
                </template>
                Log out
            </v-list-item>
        </v-list>
    </v-menu>
</template>