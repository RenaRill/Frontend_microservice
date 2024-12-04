function register() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('http://localhost:8080/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      })
      .then(response => {
          if (response.ok) {
              alert('Регистрация прошла успешно!');
              window.location.href = 'login.html';
          } else {
              return response.text().then(text => { throw new Error(text); });
          }
      })
      .catch(error => alert('Ошибка регистрации: ' + error.message));
  }