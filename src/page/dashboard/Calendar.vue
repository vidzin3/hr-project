<script setup>
import { useCalendar } from '@/plugin/useCalendar';
import FullCalendar from '@fullcalendar/vue3'

const {refCalendar,calendarOptions} = useCalendar();
</script>
<template>
    <v-card class="pa-3">
        <FullCalendar class="w-100" ref="refCalendar" :options="calendarOptions" />
    </v-card>
</template>