<script setup>
import AppForm from '@/components/AppForm.vue';
import user_logo from '@/assets/image/Sample_User_Icon.png'
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import router from '@/router';
import Toast from '@/helper/toast';

const additional_img = ref(user_logo)
const refInputEl = ref()

const form = ref({
    name:null,
    username:null,
    photo_path:null
})

const fetchData = () => {
    let item = JSON.parse(localStorage.getItem("user")) || {};
    form.value = item
}

const onChangeAvatar = (file) => {
    const fileRender = new FileReader()
    const { files } = file.target
    if (files && files.length) {
        fileRender.readAsDataURL(files[0])
        form.value.photo_path = files[0]
        fileRender.onload = () => {
            if (typeof fileRender.result === 'string') {
                additional_img.value = fileRender.result
            }
        }
    }
}

const resetAvatar = () => {
    additional_img.value = user_logo
    form.value.photo_path = null
}

const onSubmit = () => {
    let items = JSON.parse(localStorage.getItem("users")) || []
    let user = JSON.parse(localStorage.getItem("user")) || []
    let index = items.findIndex((e) => e.id == form.value.id)
    if (index !== -1) {
        items[index].name = form.value.name
        items[index].username = form.value.username
    
        user = {
            ...form.value
        }

        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(items));
        Toast.fire({
            title:"Update successfully",
            icon:'success'
        })
    } else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
}

onMounted(() => {
    fetchData()
})
</script>
<template>
    <div>
        <AppForm
            title="ប្រវត្តិរូប"
            :is-clear="false"
            @submit="onSubmit"
        >
            <v-row>
                <v-col cols="12">
                    <div class="d-flex align-center">
                        <v-avatar
                            rounded="lg"
                            size="100"
                            class="me-6"
                            :image="additional_img"
                        />
                        <div class="d-flex flex-column ga-3">
                            <div class="d-flex ga-3">
                                <v-btn color="info" @click="refInputEl?.click()">upload</v-btn>
                                <input
                                    ref="refInputEl"
                                    type="file"
                                    name="file"
                                    accept=".jpeg,.png,.jpg,GIF"
                                    hidden
                                    @input="onChangeAvatar"
                                />
                                <v-btn color="error" @click="resetAvatar">Clear</v-btn>
                            </div>
                            <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.username"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="username"
                        :rules="[(v) => !!v  || 'username is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="name"
                        :rules="[(v) => !!v  || 'name is required']"
                    ></v-text-field>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>