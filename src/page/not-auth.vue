<script setup>
import router from '@/router';

const onGoBack = () => {
    router.go(-1)
}
</script>

<template>
    <div>
        <v-app>
            <v-main>
                <div class="text-center d-flex align-center justify-center flex-column" style="height: 100vh;">
                    <div>
                        Page is Not Found
                    </div>
                    <v-btn class="mt-4" @click.prevent="onGoBack" color="info">
                        <template #prepend>
                            <v-icon>mdi-arrow-left</v-icon>
                        </template>
                        Back
                    </v-btn>
                </div>
            </v-main>
        </v-app>
    </div>
</template>