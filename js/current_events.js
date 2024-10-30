document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2024-08-01',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            list: 'Lista'
        },
        events: [
            // Fall 2024 Semester
            {
                title: 'Día de los Muertos',
                start: '2024-10-31',
                end: '2024-11-03',
                allDay: true,
                color: '#9C27B0'
            },
            {
                title: 'Halloween',
                start: '2024-10-31',
                allDay: true,
                color: '#9C27B0'
            },
            {
                title: 'Día de Acción de Gracias',
                start: '2024-11-28',
                allDay: true,
                color: '#FF9800'
            },
            {
                title: 'Descanso de Acción de Gracias',
                start: '2024-11-27',
                end: '2024-12-02',
                color: '#2196F3'
            },
            {
                title: 'Día de Navidad',
                start: '2024-12-25',
                end: '2024-12-26',
                color: '#2196F3'
            },
            {
                title: 'La Nochevieja',
                start: '2024-12-31',
                end: '2025-01-01',
                color: '#2196F3'
            },
            {
                title: 'El Día de Año Nuevo',
                start: '2025-01-01',
                end: '2025-01-02',
                color: '#2196F3'
            }
            // Spring 2025 Semester
            
        ],
        locale: 'es',
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        },
        eventClick: function(info) {
            alert('Evento: ' + info.event.title);
        },
        dayMaxEvents: true,
        themeSystem: 'bootstrap',
        validRange: {
            start: '2024-08-01',
            end: '2025-05-31'
        },
        dayCellClassNames: function(arg) {
            if (arg.date < new Date('2024-08-01') || arg.date > new Date('2025-05-31')) {
                return ['fc-day-disabled'];
            }
            return [];
        }
    });
    calendar.render();
});