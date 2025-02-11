<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const items = ref([])

const headers = computed(() => {
    return [
        {
            title:"កូគ",
            key:'code'
        },
        {
            title:"ឈ្មោះ",
            key:'khmer_name'
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem('positions'))
}

const onShow = (value) => {
    router.push(`/setting/position/show/${value.id}`)
}

const onUpdate = (value) => {
    router.push(`/setting/position/updatet/${value.id}`)
}

const onDelete = (value) => {
    Swal.fire({
        title:"តើអ្នកសម្រេចលុបពិនមែន?",
        icon:'warning',
        showDenyButton:true,
        confirmButtonText:"យល់ព្រម",
        denyButtonText:"មិនយល់ព្រម",
    }).then((res) => {
        if(res.isConfirmed){
            let items = JSON.parse(localStorage.getItem("positions")) || []
            let item = items.findIndex((e) => e.id == value.id)
            if(item != -1){
                items.splice(item,1)
                localStorage.removeItem('positions')
                localStorage.setItem('positions',JSON.stringify(items))
            }
            fetchData()
            Toast.fire({
                title:"Delete Successfully",
                icon:"success"
            })
        }
    })
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <AppDataTable
        cols="4"
        tableTitle="តារាងមុខតំណែង"
        create-url="/setting/position/create"
        :items="items.sort((a,b) => a.sort - b.sort)"
        :headers="headers"
        :is-btn-search="false"
        :is-user="false"
        :is-view="false"
        :is-delete="true"
        @on-view="onShow"
        @on-edit="onUpdate"
        @on-delete="onDelete"
    >
    </AppDataTable>
</template>