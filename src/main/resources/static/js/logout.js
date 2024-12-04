document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
    } else {
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
    }
});


function logout() {
    const username = localStorage.getItem('username');

    fetch('http://localhost:8080/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            window.location.href = 'login.html';
        } else {
            alert('Ошибка при выходе');
        }
    })
    .catch(error => console.error('Ошибка при отправке запроса на сервер:', error));
}


