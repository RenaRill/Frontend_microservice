function bookApartment(apartmentId) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
        return;
    }

    const startDate = prompt("Введите дату начала бронирования (ГГГГ-ММ-ДД):");
    const endDate = prompt("Введите дату окончания бронирования (ГГГГ-ММ-ДД):");

    if (!startDate || !endDate) {
        alert("Пожалуйста, введите даты.");
        return;
    }

    const bookingData = {
        userId: userId,
        apartmentId: apartmentId,
        startDate: startDate,
        endDate: endDate
    };

    fetch('http://localhost:8080/api/booking/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || "Неизвестная ошибка");
            });
        }
        return response.json();
    })
    .then(data => {
        alert("Апартаменты успешно забронированы!");
    })
    .catch(error => {
        alert("Данные даты уже забронированы. Пожалуйста, выберите другие.");
    });
}
