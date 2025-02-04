document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login-section');
    const reservationSection = document.getElementById('reservation-section');
    const loginForm = document.getElementById('login-form');
    const calendar = document.getElementById('calendar');
    const sessionTime = document.getElementById('session-time');
    const remainingSlots = document.getElementById('remaining-slots');
    const reserveBtn = document.getElementById('reserve-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let currentUser = null;
    let selectedDate = null;
    let selectedSession = null;
    let reservations = {
        '2025-02-05': { morning: 18, evening: 20 },
        '2025-02-06': { morning: 20, evening: 20 }
    };

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulación de autenticación
        if (email && password) {
            currentUser = email;
            loginSection.style.display = 'none';
            reservationSection.style.display = 'block';
            renderCalendar();
        }
    });

    function renderCalendar() {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        calendar.innerHTML = '';

        for (let i = 0; i < 7; i++) {
            const day = document.createElement('div');
            day.textContent = days[i];
            calendar.appendChild(day);
        }

        for (let i = 1; i <= 31; i++) {
            const date = new Date(currentYear, currentMonth, i);
            if (date.getMonth() !== currentMonth) break;

            const day = document.createElement('div');
            day.textContent = i;
            day.addEventListener('click', () => selectDate(date));
            calendar.appendChild(day);
        }
    }

    function selectDate(date) {
        selectedDate = date.toISOString().split('T')[0];
        sessionTime.textContent = 'Selecciona una sesión';
        remainingSlots.textContent = '';
        reserveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        if (reservations[selectedDate]) {
            sessionTime.textContent = 'Mañana (9:30)';
            remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate].morning};
            reserveBtn.style.display = 'block';
            selectedSession = 'morning';
        }
    }

    reserveBtn.addEventListener('click', function () {
        if (selectedDate && selectedSession) {
            if (reservations[selectedDate][selectedSession] > 0) {
                reservations[selectedDate][selectedSession]--;
                remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate][selectedSession]};
                reserveBtn.style.display = 'none';
                cancelBtn.style.display = 'block';
            }
        }
    });

    cancelBtn.addEventListener('click', function () {
        if (selectedDate && selectedSession) {
            reservations[selectedDate][selectedSession]++;
            remainingSlots.textContent = Plazas restantes: ${reservations[selectedDate][selectedSession]};
            cancelBtn.style.display = 'none';
            reserveBtn.style.display = 'block';
        }
    });
});
