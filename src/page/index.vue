<script setup>
import { onMounted, ref } from 'vue';
import Calendar from './dashboard/Calendar.vue';

const options = ref({
    title: {
        text: 'ស្ថិតិនៃចំនួនបុគ្គលិកនៅក្នុងសា្ថបន័ និងអង្គភាព',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
            fontSize:  '19px',
            fontWeight:  'bold',
            fontFamily:  'muol',
            color:  '#263238'
        },
    },
    labels:[],
    chart: {
        width: 380,
        type: 'pie',
    },
    responsive: [{
        breakpoint: 480,
        options: {
        chart: {
            width: 400
        },
        legend: {
            position: 'bottom'
        }
        }
    }]
})
const items = ref([])
const series = ref([]);
const labels = ref([]);

const fetchData = () => {
    items.value = JSON.parse(localStorage.getItem("employees"))
    let positions = JSON.parse(localStorage.getItem("positions"))

    if(!items.value) return ;

    let data = items.value.reduce((acc,it) => {
        acc[it.position_id] = acc[it.position_id] || []
        acc[it.position_id].push(it )
        return acc;
    },{})

    series.value = Object.values(data).map(arr => arr.length);

    labels.value = Object.keys(data).map(positionId => {
        let position = positions.find(p => p.id === positionId);
        return position ? position.khmer_name : `Unknown (${positionId})`;
    });
    options.value = {
        ...options.value,
        labels: labels.value
    }
}

onMounted(async () => {
    await fetchData()
})

</script>
<template>
    <div>
        <v-row>
            <v-col cols="12" md="7">
                <Calendar />
            </v-col>
            <v-col cols="12" md="5">
                <!-- apex chart -->
                 <v-row>
                    <v-col cols="12">
                        <apexchart :options="options" :series="series"></apexchart>
                    </v-col>
                    <!-- <v-col cols="12">
                        <apexchart width="490" type="donut" :options="options" :series="series"></apexchart>
                    </v-col> -->
                 </v-row>
            </v-col>
        </v-row>
    </div>
</template>