import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/km'
import { ref,onMounted } from 'vue'
import { useWindowSize } from '@/helper/windowSize'

export const useCalendar = () => {
  const winSize = useWindowSize()
  // 👉 Calendar template ref
  const refCalendar = ref()
  // 👉 Calendar API
  const calendarApi = ref(null)
  // 👉 Calendar options
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    // slotMinTime: "07:00:00",
    // slotMaxTime: "20:00:00",
    headerToolbar: {
      start: 'prev,today,next',
      center: 'title',

      end: 'dayGridMonth,listMonth',
      end: 'dayGridMonth,listMonth,dayGridDay',

      // end: "dayGridMonth,timeGridWeek,timeGridDay",
    },

    locale: esLocale,
    eventTextColor: 'white',

    buttonText: {
      today: 'ថ្ងៃនេះ',
    },

    direction: 'ltr',
    firstDay: 1,

    // Timezone
    // timeZone: "UTC",

    // events: fetchEvents,
    // ❗ We need this to be true because when its false and event is allDay event and end date is same as start data then Full calendar will set end to null
    forceEventDuration: true,
    /*
        Enable dragging and resizing event
        Docs: https://fullcalendar.io/docs/editable
      */
    // editable: true,

    /*
        Enable resizing event from start
        Docs: https://fullcalendar.io/docs/eventResizableFromStart
      */
    eventResizableFromStart: true,
    /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        Docs: https://fullcalendar.io/docs/dragScroll
      */
    // dragScroll: true,

    /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        Docs: https://fullcalendar.io/docs/dragScroll
      */

    selectable: true,

    /*
        Max number of events within a given day
        Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
    dayMaxEvents: 2,
    /*
        Determines if day names and week names are clickable
        Docs: https://fullcalendar.io/docs/navLinks
      */
    navLinks: true,

    eventTimeFormat: {
      // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      meridiem: false,
    },

    // select(e) {
    //   const startDate = new Date(e.startStr).toISOString().split('T')[0]
    //   const endDate = new Date(e.endStr).toISOString().split('T')[0]
    //   const totalDay = endDate.split('-')[2] - startDate.split('-')[2]
    //   event.value = {
    //     ...event.value,
    //     start: startDate,
    //     end: endDate,
    //     allDay: totalDay == 1 ? false : e.allDay,
    //   }

    //   isEventHandlerSidebarActive.value = true
    // },

    // eventClick({ event: clickedEvent }) {
    //   // * Only grab required field otherwise it goes in infinity loop
    //   // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
    //   const editEvent = extractEventDataFromEventApi(clickedEvent)
    //   event.value = {
    //     id: editEvent.id,
    //   }
    //   router.push(`/meeting/${editEvent.id}`)
    //   isEventHandlerSidebarActive.value = false
    // },
    // /*
    //       Handle event drop (Also include dragged event)
    //       Docs: https://fullcalendar.io/docs/eventDrop
    //       We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    //     */

    // eventDrop({ event: droppedEvent }) {
    //   const editEvent = extractEventDataFromEventApi(droppedEvent)

    //   const dropEvent = {
    //     id: editEvent.id,
    //     title: editEvent.title,
    //     start_date: formatDateTime(new Date(droppedEvent.startStr).toISOString()),
    //     end_date: formatDateTime(new Date(droppedEvent.endStr).toISOString()),
    //     amount: editEvent.extendedProps.amount,
    //     unit: editEvent.extendedProps.unit,
    //     subject: editEvent.extendedProps.subject,
    //     place: editEvent.extendedProps.place,
    //     employee_ids: droppedEvent._def.extendedProps.employees,
    //     meeting_type_id: editEvent.extendedProps.meeting_type_id,
    //   }
    //   // updateEvent(extractEventDataFromEventApi(droppedEvent._def));
    //   updateEvent(dropEvent)
    // },
    // /*
    //       Handle event resize
    //       Docs: https://fullcalendar.io/docs/eventResize
    //     */
    // eventResize({ event: resizedEvent }) {
    //   if (resizedEvent.start && resizedEvent.end) updateEvent(extractEventDataFromEventApi(resizedEvent))
    // },
  }

  onMounted(async () => {
    calendarApi.value = refCalendar.value.getApi()
    // store.getMeetingTypes()
  })
  return {
    refCalendar,
    calendarOptions,
  }
}
