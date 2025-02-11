<script setup>
import AppForm from '@/components/AppForm.vue';
import Toast from '@/helper/toast';
import router from '@/router';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

const employee_dialog = ref(false)
const employees = ref([])
const employee_name = ref(null)

const leftJoin = (table1,table2,source_key,target_key,field,key_name_return) => {
    return table1.map((sourceItem) => {
        const item = table2.find(
            (e) => e[target_key] == sourceItem[source_key]
        )
        return {
            ...sourceItem,
            [field]: item ? item[key_name_return] : 'on key'
        }
    })
}

const getNameEmployee = (table,table2,key1,key2,key_name) => {
    let name = null;
    const item = table2.find((e) => e[key1] == table[key2])
    name = item[key_name]
    return name
}

const options = ref({
    attendance_type:[
        {
            id:1,
            name:"ច្បាប់រយះពេលខ្លី"
        },
        {
            id:2,
            name:"ច្បាប់ប្រចាំឆ្នាំ"
        },
        {
            id:3,
            name:"ច្បាប់លំហែមាតភាព"
        },
        {
            id:4,
            name:"ច្បាប់សម្រាកព្យាបាលសុខភាព"
        },
        {
            id:5,
            name:"ច្បាប់សម្រាកដោយមានភារផ្ទាល់ខ្លួន"
        },
        {
            id:6,
            name:"អត់ច្បាប់"
        },
    ]
})

const form = ref({
    id:null,
    reason:null,
    type:null,
    date:dayjs(new Date()).format("YYYY-MM-DD"),
    employee_id:null,
    status:null,
    created_at:dayjs(new Date()).format("YYYY-MM-DD"),
    updated_at:dayjs(new Date()).format("YYYY-MM-DD")
})

const resetForm = () => {
    form.value = {
        id:null,
        reason:null,
        type:null,
        date:dayjs(new Date()).format("YYYY-MM-DD"),
        employee_id:null,
        status:null,
        created_at:dayjs(new Date()).format("YYYY-MM-DD"),
        updated_at:dayjs(new Date()).format("YYYY-MM-DD")
    }
    employee_name.value = null
}

const fetchData = () => {
    let items = JSON.parse(localStorage.getItem("attendances")) || []
    let index = items.findIndex((e) => e.id == router.currentRoute.value.params.id)
    if(index !== -1){
        form.value = {...items[index]}
        employee_name.value = getNameEmployee(items[index],employees.value,'id',"employee_id","khmer_name");      
    }
}

const fetchEmployee = () => {
    employees.value = JSON.parse(localStorage.getItem("employees")) || []
}

const onOpenDialog = () => {
    employee_dialog.value = true
}

const getEmployee = (value) => {
    form.value.employee_id = value.id
    employee_name.value = value.khmer_name
    employee_dialog.value = false
}

const onSubmit = () => {
    let data = JSON.parse(localStorage.getItem("attendances")) || []
    let index = data.findIndex((e) => e.id == form.value.id)
    if(index != -1){
        data[index] = {
            ...form.value
        }

        localStorage.setItem('attendances', JSON.stringify(data));
        Toast.fire({
            title:"Update successfully",
            icon:'success'
        })
        router.push('/attendance/list')
    }else {
        Swal.fire({
            title:"Data on Found!",
            icon:'error'
        })
    }
}

onMounted(() => {
    fetchEmployee()
    fetchData()
})

</script>

<template>
    <div>
        <AppForm
            btn-submit="Save"
            title="កែសម្រួលអវត្តមាន"
            @on-clear="resetForm"
            @submit="onSubmit"
        >
            <v-row>
                <v-col cols="12" md="10">
                    <v-text-field
                        v-model="form.employee_id"
                        :model-value="employee_name"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="បុគ្គលិក"
                        readonly
                        :rules="[(v) => !!v  || 'បុគ្គលិក is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <VBtn
                        color="info"
                        class="rounded-sm"
                        @click="onOpenDialog"
                    >
                        <template v-slot:prepend>
                            <VIcon>mdi-account</VIcon>
                        </template> 
                        <span>ជ្រើសរើស</span>
                    </VBtn>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        type="date"
                        v-model="form.date"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ថ្ងៃឈប់"
                        :rules="[(v) => !!v  || 'ថ្ងៃឈប់ is required']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-autocomplete
                        v-model="form.type"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="ប្រភេទច្បាប់"
                        :items="options.attendance_type"
                        item-value="id"
                        item-title="name"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="12">
                    <v-textarea
                        v-model="form.reason"
                        rows="4"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        label="មូលហេតុ"
                        :rules="[(v) => !!v  || 'មូលហេតុ is required']"
                    >
                    </v-textarea>
                </v-col>
            </v-row>
        </AppForm>
    </div>
    <v-dialog
        v-model="employee_dialog"
        max-width="600"
    >
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>តារាងបុគ្គលិក</span>
                <v-btn color="primary" variant="text" @click="employee_dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-4 py-2">
                <v-list v-for="item in employees">
                    <v-list-item class="border-sm rounded-sm">
                        <template v-slot:prepend>
                            {{ item.code }} - {{ item.khmer_name }}
                        </template>
                        <template v-slot:append>
                            <VBtn color="info" density="compact" icon class="rounded-sm" @click="getEmployee(item)">
                                <VIcon>mdi-plus</VIcon>
                            </VBtn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>