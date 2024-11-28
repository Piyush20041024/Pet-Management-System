// Helper functions to manage users and pets in localStorage

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getPets() {
    return JSON.parse(localStorage.getItem('pets')) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Registration logic
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const users = getUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists!');
        return;
    }

    users.push({ username, password, email, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully!');
    window.location.href = 'login.html';
});

// Login logic
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});

// Dashboard and Pet Management
window.onload = function() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
    }

    document.getElementById('usernameDisplay').textContent = currentUser.username;

    // Display pet details
    const pets = getPets().filter(pet => pet.owner === currentUser.username);
    if (pets.length === 0) {
        document.getElementById('petDetails').innerHTML = '<p>No pets registered</p>';
    } else {
        const petList = pets.map(pet => `
            <p>${pet.name} - ${pet.type} - ${pet.breed}</p>
            <button onclick="deletePet(${pet.id})">Delete Pet</button>
        `).join('');
        document.getElementById('petDetails').innerHTML = petList;
    }

    // Admin functionality for downloading pet data
    if (currentUser.role === 'admin') {
        document.getElementById('downloadBtnContainer').innerHTML = `
            <button onclick="downloadPetData()">Download All Pet Data</button>
        `;
    }
}

// Register a new pet
function registerPet() {
    const currentUser = getCurrentUser();
    const petName = prompt('Enter Pet Name');
    const petType = prompt('Enter Pet Type');
    const petBreed = prompt('Enter Pet Breed');

    if (petName && petType && petBreed) {
        const pets = getPets();
        const petId = pets.length ? pets[pets.length - 1].id + 1 : 1;
        pets.push({ id: petId, name: petName, type: petType, breed: petBreed, owner: currentUser.username });
        localStorage.setItem('pets', JSON.stringify(pets));

        alert('Pet Registered Successfully');
        window.location.reload();
    }
}

// Delete pet
function deletePet(petId) {
    const pets = getPets().filter(pet => pet.id !== petId);
    localStorage.setItem('pets', JSON.stringify(pets));
    alert('Pet deleted successfully');
    window.location.reload();
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Admin: Download all pet data
function downloadPetData() {
    const pets = getPets();
    let petData = 'Pet ID, Name, Type, Breed, Owner\n';
    pets.forEach(pet => {
        petData += `${pet.id}, ${pet.name}, ${pet.type}, ${pet.breed}, ${pet.owner}\n`;
    });

    const blob = new Blob([petData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pets.csv';
    link.click();
}
