<script setup>
import Toast from '@/helper/toast';
import router from '@/router';
import hrLogo from '@/assets/image/logo.png'
import { useWindowSize } from '@/helper/windowSize';
import { computed, ref } from 'vue';

const confirm_password = ref(null)
const windowSize = useWindowSize()

const items = computed(() => {
    return JSON.parse(localStorage.getItem("users")) || []
})

const getNextId = () => {
    return items.value.length > 0 ? Math.max(...items.value.map((e) => e.id)) + 1 : 1;
}

const form = ref({
    username:"",
    password:"",
    email:"",
    is_super:false,
    is_disabled:false,
})

const show1 = ref(false)
const show2 = ref(false)
const refForm = ref(null)

const onSubmit = async  () => {
    const {valid} = await refForm?.value.validate()
    if(valid){
        let data = items.value || []
        form.value.id = getNextId()
        data.push({...form.value})
        localStorage.setItem("users",JSON.stringify(data))
        router.push('/login')
        Toast.fire({
            title:"create successfully",
            icon:"success"
        })
    }
}

</script>
<template>
    <v-row justify="center" :style="{ height: windowSize.width < 769 ? '100%' : '100vh'}">
        <v-col cols="11" md="3">
            <v-form ref="refForm" @submit.prevent="onSubmit" lazy-validate>
                <div>
                    <v-img :src="hrLogo"></v-img>
                </div>
                <v-card variant="tonal">
                    <v-card-title>
                        <div class="d-flex justify-space-between">
                            <span>Register</span>
                            <div>
                                <v-btn to="/login" density="compact" color="info" icon variant="tonal" class="rounded-lg">
                                    <v-icon size="sm">mdi-login</v-icon>
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
                                    :rules="[(v) => !!v  || 'password is required']"
                                    placeholder="Username"
                                ></v-text-field>
                                <v-label>Email</v-label>
                                <v-text-field
                                    v-model="form.email"
                                    variant="outlined"
                                    density="compact"
                                    name="input-10-1"
                                    placeholder="email@gmail.com"
                                    :rules="[(v) => !!v  || 'email is required']"
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
                                <v-label>Confirm Password</v-label>
                                <v-text-field
                                    v-model="confirm_password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    hint="At least 8 characters"
                                    name="input-10-1"
                                    variant="outlined"
                                    placeholder="Confirm Password"
                                    :rules="[
                                        v => !!v || 'Password is required',
                                        v => form.password === confirm_password || 'Confirm password does not match password'
                                    ]"
                                    density="compact"
                                    counter
                                    @click:append="show2 = !show2"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-end">
                                <v-btn type="submit" color="info" variant="tonal" class="rounded-lg">
                                    <template #prepend>
                                        <v-icon size="sm">mdi-check</v-icon>
                                    </template>
                                    register
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>