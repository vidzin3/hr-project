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

const options = ref({
  status:[
      {id:0,name:"មិនទាន់អនុម័ត"},
      {id:1,name:"អនុម័ត"}
  ],
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

const form = ref({
    from_date:dayjs(new Date()).startOf('month').format("YYYY-MM-DD"),
    to_date:dayjs(new Date()).endOf('month').format("YYYY-MM-DD"),
    status:1,
})

// Number.prototype.between = function(a, b, inclusive) {
//   var min = Math.min(a, b),
//     max = Math.max(a, b);

//   return inclusive ? this >= min && this <= max : this > min && this < max;
// }

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
  status_name.value = options.value.status.find((e) => e.id == form.value.status)
  let data = JSON.parse(localStorage.getItem("attendances")) || []
  let filteredItems = data.filter(item => {
    let itemDate = dayjs(item.date);
    let statusMatch = item.status == form.value.status; 

    return (
      itemDate.isValid() &&
      itemDate.isBetween(form.value.from_date, form.value.to_date, null, '[]') &&
      statusMatch
    );
  });
  let emp = leftJoin(employees.value,positions.value,"position_id","id","position_name","khmer_name")
  let office = leftJoin(emp,offices.value,"office_id","id","office_name","khmer_name")
  let item = leftJoin(filteredItems,office,"employee_id","id","employee")
  let type_attendance = leftJoin(item,options.value.attendance_type,"type","id","attendance_type","name")
  items.value = type_attendance
  isSubmit.value = true
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
        btn-submit="GET"
        :is-clear="false"
        cols="6"
        title="របាយការណ៍អវត្តមាន"
        @submit="onSubmit"
    >
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="form.from_date"
                    type="date"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    label="ចាប់ពីថ្ងៃ"
                    :rules="[(v) => !!v  || 'ចាប់ពីថ្ងៃ is required']"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="form.to_date"
                    type="date"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    label="ដល់ថ្ងែ"
                    :rules="[(v) => !!v  || 'ដល់ថ្ងែ is required']"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-autocomplete
                    v-model="form.status"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    label="ប្រភេទស្ថានភាព"
                    :items="options.status"
                    item-title="name"
                    item-value="id"
                ></v-autocomplete>
            </v-col>
        </v-row>
    </AppForm>
    <v-card v-if="isSubmit">
        <!-- <v-card-title>
          <div align="end">
            <v-btn
              color="white"
              flat
              :loading="exporting"
              @click.prevent="onExportPdf"
            >
              <v-icon color="error">mdi-file-pdf-outline</v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                >ដោនលោតជា PDF</v-tooltip
              >
            </v-btn>
            <v-btn
              color="white"
              flat
              :loading="exporting"
              @click.prevent="onExport"
            >
              <v-icon color="green">mdi-file-excel-outline</v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                >ដោនលោតជា EXCEL</v-tooltip
              >
            </v-btn>
          </div>
        </v-card-title> -->
        <div class="exportTable">
          <div id="print-area" class="report-body">
            <v-card-text class="content">
              <table
                width="100%"
                dense
                id="myTable"
                class="table-content report-body"
                style="border-collapse: collapse; color: black"
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
                      font-size: 13px;
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
                      font-size: 13px;
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
                      font-size: 13px;
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
                      font-size: 13px;
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
                      font-size: 13px;
                    "
                  >
                    របាយការណ៍នៃបញ្ជីអវត្តមានដែល{{ status_name?.name }}ក្នុងថ្ងៃ {{ form.from_date }} ដល់ថ្ងៃ {{ form.to_date }}
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    ល.រ
                  </td>
                  <td
                    colspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    នាមករណ៏
                  </td>
                  <td
                    colspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    មុខដំណែង
                  </td>
                  <td
                    colspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    ការិយាល័យ
                  </td>
                  <td
                    colspan="2"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    ប្រភេទច្បាប់
                  </td>
                  <td
                    colspan="4"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    កាលបរិច្ចេក
                  </td>
                  <td
                    colspan="8"
                    style="
                      border: 1px solid black;
                      border-collapse: collapse;
                      text-align: center;
                      font-family: Khmer Os Muol Light;
                      line-height: normal;
                      font-size: 13px;
                    "
                  >
                    មូលហេតុ
                  </td>
                </tr>
                <tr v-for="(rt,index) in items">
                  <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ index + 1 }}</td>
                  <td colspan="2" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.employee.khmer_name }}</td>
                  <td colspan="2" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.employee.position_name }}</td>
                  <td colspan="2" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.employee.office_name }}</td>
                  <td colspan="2" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.attendance_type }}</td>
                  <td colspan="4" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.date }}</td>
                  <td colspan="8" style="border: 1px solid black;border-collapse: collapse;text-align: center;">{{ rt.reason }}</td>
                </tr>
              </table>
            </v-card-text>
          </div>
        </div>
    </v-card>
</template>