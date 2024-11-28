document.getElementById('loginBtn').addEventListener('click', function () {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password && user.role === role);

    if (user) {
        localStorage.setItem('role', role);
        if (role === 'user') {
            window.location.href = 'user.html';
        } else if (role === 'admin') {
            window.location.href = 'admin.html';
        }
    } else {
        document.getElementById('message').innerText = 'Invalid credentials!';
    }
});
