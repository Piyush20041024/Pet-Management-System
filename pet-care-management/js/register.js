document.getElementById('registerBtn').addEventListener('click', function () {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (username === '' || password === '' || confirmPassword === '') {
        document.getElementById('message').innerText = 'All fields are required!';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('message').innerText = 'Passwords do not match!';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        document.getElementById('message').innerText = 'Username already exists!';
        return;
    }

    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    window.location.href = 'index.html';
});
