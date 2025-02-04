document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const loginSection = document.getElementById('login-section');
    const reservationSection = document.getElementById('reservation-section');
    const loginForm = document.getElementById('login-form');
    const calendar = document.getElementById('calendar');
    const sessionTime = document.getElementById('session-time');
    const remainingSlots = document.getElementById('remaining-slots');
    const reserveBtn = document.getElementById('reserve-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Variables de estado
    let currentUser = null;
    let selectedDate = null;
    let selectedSession = null;

    // Datos simulados de reservas
    let reservations = {
        '2025-02-05': { morning: 18, evening: 20 },
        '2025-02-06': { morning: 20, evening: 20 },
        '2025-02-07': { morning: 15, evening: 20 },
        // Puedes agregar más fechas y datos según sea necesario
    };

    // Evento de inicio de sesión
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que el formulario se envíe
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulación de autenticación
        if (email && password) {
            currentUser = email; // Guarda el usuario actual
            loginSection.style.display = 'none'; // Oculta la sección de inicio de sesión
            reservationSection.style.display = 'block'; // Muestra la sección de reservas
            renderCalendar(); // Renderiza el calendario
        }
    });

    // Función para renderizar el calendario
    function renderCalendar() {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        calendar.innerHTML = ''; // Limpia el calendario

        // Renderiza los días de la semana
        for (let i = 0; i < 7; i++) {
            const day = document.createElement('div');
            day.textContent = days[i];
            calendar.appendChild(day);
        }

        // Renderiza los días del mes
        for (let i = 1; i <= 31; i++) {
            const date = new Date(currentYear, currentMonth, i);
            if (date.getMonth() !== currentMonth) break; // Detén el bucle si cambia el mes

            const day = document.createElement('div');
            day.textContent = i;
            day.addEventListener('click', () => selectDate(date));
            calendar.appendChild(day);
        }
    }

    // Función para seleccionar una fecha
    function selectDate(date) {
        selectedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        sessionTime.textContent = 'Selecciona una sesión';
        remainingSlots.textContent = '';
        reserveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        if (reservations[selectedDate]) {
            // Muestra la información de la sesión de la mañana
            sessionTime.textContent = 'Mañana (9:30)';
            remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate].morning};
            reserveBtn.style.display = 'block';
            selectedSession = 'morning';
        }
    }

    // Evento para reservar una sesión
    reserveBtn.addEventListener('click', function () {
        if (selectedDate && selectedSession) {
            if (reservations[selectedDate][selectedSession] > 0) {
                reservations[selectedDate][selectedSession]--; // Reduce las plazas disponibles
                remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate][selectedSession]};
                reserveBtn.style.display = 'none';
                cancelBtn.style.display = 'block';
                alert(Reserva confirmada para el ${selectedDate} en la sesión de ${selectedSession}.);
            } else {
                alert('No hay plazas disponibles para esta sesión.');
            }
        }
    });

    // Evento para cancelar una reserva
    cancelBtn.addEventListener('click', function () {
        if (selectedDate && selectedSession) {
            reservations[selectedDate][selectedSession]++; // Aumenta las plazas disponibles
            remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate][selectedSession]};
            cancelBtn.style.display = 'none';
            reserveBtn.style.display = 'block';
            alert(Reserva cancelada para el ${selectedDate} en la sesión de ${selectedSession}.);
        }
    });
});
