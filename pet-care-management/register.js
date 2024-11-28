// js/register.js
document.getElementById('registerBtn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value;
    const petName = document.getElementById('petName').value;
    const petBreed = document.getElementById('petBreed').value;
    const petType = document.getElementById('petType').value;
    const petWeight = document.getElementById('petWeight').value;
    const petHeight = document.getElementById('petHeight').value;

    if (userId && petName && petBreed && petType && petWeight && petHeight) {
        let pets = JSON.parse(localStorage.getItem('pets')) || [];
        
        // Add the new pet details to the list
        pets.push({
            userId, petName, petBreed, petType, petWeight, petHeight
        });

        // Save updated pets data back to localStorage
        localStorage.setItem('pets', JSON.stringify(pets));

        alert('Pet Registered Successfully!');
        // Optionally redirect to the login page or another page
        window.location.href = 'index.html';
    } else {
        alert('Please fill all fields!');
    }
});
