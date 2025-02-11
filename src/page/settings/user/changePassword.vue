<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const old_password = ref(null)
const new_password = ref(null)

const form = ref({
    id:null,
    email:null,
    username:null,
    name:null,
    is_super:false,
    is_disabled:false,
    password:null
})

const resetForm = () => {
    form.value = {
        id:null,
        email:null,
        username:null,
        name:null,
        is_super:false,
        is_disabled:false,
        password:null
    }
}

const fetchData = () => {
    let data = JSON.parse(localStorage.getItem("users")) || []
    let item = data.findIndex((e) => e.id == router.currentRoute.value.params.id)
    if(item != -1){
        form.value = {...data[item]}
        form.value.is_disabled = data[item].is_disabled ? true : false
        form.value.is_super = data[item].is_super ? true : false
    }
}

const onSubmit = () => {
    let items = JSON.parse(localStorage.getItem("users")) || []
    let user = JSON.parse(localStorage.getItem("user")) || []
    let index = items.findIndex((e) => e.id == form.value.id)
    if (index !== -1) {
        if(items[index].password != old_password.value){
            Swal.fire({
                title:"password wrong",
                icon:'error'
            })
        }else {
            form.value.password = new_password.value
            items[index] = {
                ...items[index],
                ...form.value
            };

            user.password = form.value.password

            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(items));
            Toast.fire({
                title:"Update successfully",
                icon:'success'
            })
            router.go(-1)
        }
    } else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
}

onMounted(async () => {
    await fetchData()
})

</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="ផ្លាស់ប្តូរពាក្យសម្ងាត់"
            @submit="onSubmit"
            @on-clear="resetForm"
        >
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="old_password"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="Old Password"
                        :rules="[(v) => !!v  || 'Old Password is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="new_password"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="New Password"
                        :rules="[(v) => !!v  || 'New Password is required']"
                    ></v-text-field>
                </v-col>
            </v-row>
        </AppForm>
    </div>
</template>