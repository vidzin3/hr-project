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
            title:"ឈ្មោះជាឡាតាំង",
            key:'latin_name',
            value:(item) => (item.latin_name == null ? '' : item.latin_name)
        },
        {
            title:"ខណ្ឌ",
            key:'is_khan',
            value:(item) => (item.is_khan ? 'មានសិទ្ធិ' : 'គ្មានសិទ្ធិ')
        },
        {
            title:"ក្រុង",
            key:'is_city',
            value:(item) => (item.is_city ? 'មានសិទ្ធិ' : 'គ្មានសិទ្ធិ')
        },
        {
            title:"ស្រុក",
            key:'is_district',
            value:(item) => (item.is_district ? 'មានសិទ្ធិ' : 'គ្មានសិទ្ធិ')
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem('offices'))
}

const onShow = (value) => {
    router.push(`/setting/office/show/${value.id}`)
}
const onEdit = (value) => {
    router.push(`/setting/office/update/${value.id}`)
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
            let data = JSON.parse(localStorage.getItem('offices')) || [];
            let index = data.findIndex((e) => e.id == value.id);
            if (index !== -1) {
                data.splice(index, 1);
                localStorage.setItem('offices', JSON.stringify(data)); 
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
        cols="10"
        tableTitle="តារាងការិយាល័យ"
        create-url="/setting/office/create"
        :items="items.sort((a,b) => a.sort - b.sort)"
        :headers="headers"
        :is-btn-search="false"
        :is-user="false"
        :is-view="false"
        :is-delete="true"
        @on-view="onShow"
        @on-edit="onEdit"
        @on-delete="onDelete"
    >
    </AppDataTable>
</template>