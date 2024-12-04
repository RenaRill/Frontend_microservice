fetch('http://localhost:8080/api/apartment')
    .then(response => response.json())
    .then(data => {
        const apartmentList = document.getElementById('apartmentList');
        data.forEach(apartment => {
            const div = document.createElement('div');
            div.className = 'apartment-item';
            div.innerHTML = `
                <h3>${apartment.number} - ${apartment.hotel}</h3>
                <p>Вместимость: ${apartment.capacity} чел.</p>
                <p>Удобства: ${apartment.amenities}</p>
                <p>Цена за ночь: ${apartment.pricePerNight} ₽</p>
                <div id="occupiedDates-${apartment.id}"></div> <!-- Место для отображения занятых дат -->
                <button class="bookButton" onclick="bookApartment('${apartment.id}')">Забронировать</button>
            `;
            apartmentList.appendChild(div);

            fetch(`http://localhost:8080/api/booking/apartment/${apartment.id}`)
                .then(response => response.json())
                .then(bookings => {
                    const occupiedDatesDiv = document.getElementById(`occupiedDates-${apartment.id}`);
                    if (bookings.length > 0) {
                        const occupiedDates = bookings.map(booking => {
                            const startDate = new Date(booking.startDate);
                            const endDate = new Date(booking.endDate);
                            return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
                        }).join(', ');
                        occupiedDatesDiv.innerHTML = `<p>Занятые даты: ${occupiedDates}</p>`;
                    } else {
                        occupiedDatesDiv.innerHTML = `<p>Все даты свободны.</p>`;
                    }
                })
                .catch(error => console.error('Ошибка получения бронирований:', error));
        });
    })
    .catch(error => console.error('Ошибка загрузки апартаментов:', error));
