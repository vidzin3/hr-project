<script setup>
import { onMounted, ref } from 'vue';
import {useAuthStore} from '@/store/auth.module'
import hrLogo from '@/assets/image/logo.png'
import user from '@/data/user.json'
import { useWindowSize } from '@/helper/windowSize';

const windowSize = useWindowSize()

const form = ref({
    username:null,
    password:null
})

const store = useAuthStore()
const show1 = ref(false)
const refForm = ref()

const onSubmit = async () => {
    const {valid} = await refForm?.value.validate()
    if(valid){
        store.login(form.value)
    }
}

onMounted(() => {
    let existingUsers = JSON.parse(localStorage.getItem("users"))
    if (!existingUsers || existingUsers.length === 0) {
        store.setUsers(user);
    }
})

</script>
<template>
    <v-row justify="center" align="start" :style="{ height: windowSize.width < 769 ? '100%' : '100vh'}">
        <v-col cols="11" md="3">
            <v-form ref="refForm" @submit.prevent="onSubmit" lazy-validate>
                <div>
                    <v-img :src="hrLogo"></v-img>
                </div>
                <v-card variant="tonal">
                    <v-card-title>
                        <div class="d-flex justify-space-between">
                            <span>Login</span>
                            <div>
                                <v-btn to="/register" density="compact" color="info" icon variant="tonal" class="rounded-lg">
                                    <v-icon size="sm">mdi-account-edit</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-label>Username</v-label>
                                <v-text-field
                                    v-model="form.username"
                                    variant="outlined"
                                    density="compact"
                                    name="input-10-1"
                                    placeholder="Username"
                                    :rules="[(v) => !!v  || 'username is required']"
                                ></v-text-field>
                                <v-label>Password</v-label>
                                <v-text-field
                                    v-model="form.password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    hint="At least 8 characters"
                                    name="input-10-1"
                                    variant="outlined"
                                    density="compact"
                                    placeholder="Password"
                                    :rules="[(v) => !!v  || 'password is required']"
                                    counter
                                    @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-end">
                                <v-btn type="submit" color="info" variant="tonal" class="rounded-lg">
                                    <template #prepend>
                                        <v-icon size="sm">mdi-login</v-icon>
                                    </template>
                                    Login
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>