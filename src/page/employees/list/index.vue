<script setup>
import AppDataTable from '@/components/AppDataTable.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const data = ref([])
const positions = ref([])
const offices = ref([])
const items = ref([]) 
const search = ref(null)

const LeftJoin = (sourceArray, targetArray, sourceKey, targetKey, mergeKey) => {
  return sourceArray.map((sourceItem) => {
    const item = targetArray.find(
      (targetItem) => targetItem[targetKey] === sourceItem[sourceKey]
    );
    return {
      ...sourceItem,
      [mergeKey]: item ? item.khmer_name : "no key",
    };
  });
};

const mergeData = () => {
    let item = LeftJoin(data.value, positions.value, "position_id", "id", "position");

    item = LeftJoin(item,offices.value,"office_id","id","office")

    items.value = item    
}

const headers = computed(() => {
    return [
        {
            title:"ឈ្មោះ/នាម",
            key:'khmer_name'
        },
        {
            title:"ឈ្មោះជាឡាតាំង",
            key:'latin_name'
        },
        {
            title:"ភេទ",
            key:'sex',
            value:(item) => (item.sex == 1 ? 'ប្រុស' : 'ស្រី') 
        },
        {
            title:"សញ្ជាតិ",
            key:'nationality'
        },
        {
            title:"មុខតំណែង",
            key:'position'
        },
        {
            title:"ការិយាល័យ",
            key:'office'
        },
        {
            title:"សកម្មភាព",
            key:'action'
        },
    ]
})

const fetchData = () => {
    data.value = JSON.parse(localStorage.getItem('employees')) || []
}

const fetchOffice = () => {
  offices.value = JSON.parse(localStorage.getItem("offices")) || []
}

const fetchPosition = () => {
  positions.value = JSON.parse(localStorage.getItem("positions")) || []
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
            let data = JSON.parse(localStorage.getItem('employees')) || [];
            let index = data.findIndex((e) => e.id == value.id);
            if (index !== -1) {
                data.splice(index, 1);
                localStorage.setItem('employees', JSON.stringify(data)); 
            }
            fetchData()
            fetchOffice()
            fetchPosition()
            mergeData()
            Toast.fire({
                title:"Delete Successfully",
                icon:"success"
            })
        }
    })
    
}

const onUpdate = (value) => {
    router.push(`/employee/update/${value.id}`)
}

onMounted(() => {
    fetchData()
    fetchOffice()
    fetchPosition()
    mergeData()
})
</script>

<template>
    <div>
        <AppDataTable 
            table-title="បញ្ជីឈ្មោះបុគ្គលិក"
            create-url="/employee/create"
            :headers="headers"
            :items="items || []"
            :is-view="false"
            :is-delete="true"
            :is-btn-search="false"
            @on-edit="onUpdate"
            @on-delete="onDelete"
        >
            <template #search>
                <v-text-field
                    v-model="search"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    label="ស្វែងរក"
                ></v-text-field>
            </template>
        </AppDataTable>
    </div>
</template>