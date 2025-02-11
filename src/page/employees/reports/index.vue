<script setup>
import AppForm from '@/components/AppForm.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { onMounted, ref, watch } from 'vue';
import { useWindowSize } from '@/helper/windowSize';

dayjs.extend(isBetween);

const windowSize = useWindowSize()
const status_name = ref(null)
const items = ref([])
const offices = ref([])
const positions = ref([])
const employees = ref([])
const isSubmit = ref(false)
const refForm = ref()

const options = ref({
    status:[
        {id:0,name:"មិនទាន់អនុម័ត"},
        {id:1,name:"អនុម័ត"}
    ]
})

const form = ref({
  office_id:null,
  position_id:null
})

const leftJoin = (data,source,source_key,target_key,mapping_key,name_point) => {
  return data.map((sourceItem) => {
    const item = source.find(
        (targetItem) => targetItem[target_key] === sourceItem[source_key]
    );
    if(name_point){
      return {
        ...sourceItem,
        [mapping_key]: item ? item[name_point] : "no key",
      };
    }else {
      return {
        ...sourceItem,
        [mapping_key]: item ? item : "no key",
      };
    }
  })
} 

const fetchPosition = () => {
  positions.value = JSON.parse(localStorage.getItem("positions")) || []
}

const fetchOffice = () => {
  offices.value = JSON.parse(localStorage.getItem("offices")) || []
}

const fetchEmployee = () => {
  employees.value = JSON.parse(localStorage.getItem("employees")) || []
}

const onSubmit = () => {
  let items_emp = JSON.parse(localStorage.getItem("employees")) || []
  let item = items_emp.filter((e) => e.office_id == form.value.office_id)
  let data = item.filter((e) => e.position_id == form.value.position_id)

  let emp = leftJoin(data,positions.value,"position_id","id","position_name","khmer_name")
  let office = leftJoin(emp,offices.value,"office_id","id","office_name","khmer_name")
  items.value = office
  if(items.value.length <= 0){
    isSubmit.value = false
  }else {
    isSubmit.value = true
  }
  
}

watch(() => form.value.status,(newVal) => {
  status_name.value = options.value.status.find((e) => e.id == newVal)
})

onMounted(() => {
  fetchOffice()
  fetchPosition()
  fetchEmployee()
})
</script>

<template>
    <AppForm
      ref="refForm"
      btn-submit="GET"
      :is-clear="false"
      cols="6"
      title="របាយការណ៍បុគ្គលិក"
      @submit="onSubmit"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
              v-model="form.office_id"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              label="ការិយាល័យ/ផ្នែក"
              :items="offices"
              item-title="khmer_name"
              item-value="id"
              :rules="[(v) => !!v  || 'ការិយាល័យ/ផ្នែក is required']"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
              v-model="form.position_id"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              label="មុខដំណែង"
              :items="positions"
              item-title="khmer_name"
              item-value="id"
              :rules="[(v) => !!v  || 'មុខដំណែង is required']"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </AppForm>
    <v-card v-if="isSubmit">
        <div class="exportTable">
          <div id="print-area" class="report-body">
            <v-card-text class="content">
              <table
                width="100%"
                dense
                id="myTable"
                class="table-content report-body"
                style="border-collapse: collapse; color: black;overflow: auto;"
              >
                <colgroup>
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                </colgroup>

                <tr>
                  <td colspan="7"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ព្រះរាជាណាចក្រកម្ពុជា
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ខេត្តបាត់ដំបង
                  </td>
                  <td colspan="3"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ជាតិ សាសនា ព្រះមហាក្សត្រ
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ការិយាល័យគ្រប់គ្រងធន់ធានមនុស្ស
                  </td>
                  <td colspan="3"></td>
                  <td
                    colspan="6"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: tacteng;
                      line-height: normal;
                      font-size: 42px;
                    "
                  >
                    6
                  </td>
                  <td colspan="7"></td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                  រដ្ឋបាលក្រុងបាត់ដំបង
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="20"
                    style="
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    បញ្ជីបច្ចុប្បន្នភាពមន្ត្រីរាជការស៊ីវិលក្នុងរចនាសម្ព័ន្ធរដ្ឋបាលក្រុងបាត់ដំបងតាមការិយាល័យ/ផ្នែក និងតាមមុខដំណែង
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="20"
                    valign="center"
                    style="
                      text-align: center;
                      font-family: tacteng;
                      line-height: normal;
                      font-size: 16px;
                      padding: 10px;
                    "
                  >
                    ros
                  </td>
                </tr>
                <tr>
                  <td 
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    អត្តលេខ
                  </td>
                  <td
                    colspan="3"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    នាម-គោត្តនាម
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ភេទ
                  </td>
                  <td
                    colspan="4"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ថ្ងៃខែឆ្នាំ
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    មុខតំណែងបច្ចុប្បន្ន
                  </td>
                  <td
                    colspan="2"
                    rowspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    កាំបៀវត្ស
                  </td>
                  <td
                    colspan="6"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    កំរិតវប្បមធ៌ឬកំរិតបណ្តុះបណ្តាលមុខវិជ្ជាជីវៈមូលដ្ឋាននិងក្រោយមូលដ្ឋាន
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    កំណើត
                  </td>
                  <td
                    colspan="2"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ចូលបម្រើការ
                  </td>
                  <td
                    colspan="3"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    សញ្ញាបត្រ
                  </td>
                  <td
                    colspan="2"
                    rowspan="1"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 12px;
                    "
                  >
                    ជំនាញ/ឯកទេស
                  </td>
                </tr>
                <tr v-for="rt in items">
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.code }}
                  </td>
                  <td 
                    colspan="3" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.khmer_name }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.sex }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.dob }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.join_date }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.position_name }}
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    {{ rt.rank }}-{{ rt.number_of_rank }}
                  </td>
                  <td 
                    colspan="3" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    
                  </td>
                  <td 
                    colspan="2" 
                    style="border: 1px solid black;border-collapse: collapse;text-align: center;"
                  >
                    
                  </td>
                </tr>
              </table>
            </v-card-text>
          </div>
        </div>
    </v-card>
</template>