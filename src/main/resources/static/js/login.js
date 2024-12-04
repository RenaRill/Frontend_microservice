function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Ошибка авторизации');
    }
  })
  .then(data => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', username);
    window.location.href = 'index.html';
  })
  .catch(error => {
    alert(error.message);
    console.error('Ошибка:', error);
  });
}


