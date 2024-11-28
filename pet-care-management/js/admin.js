// js/admin.js

// Fetch the pets data from local storage
const pets = JSON.parse(localStorage.getItem('pets')) || [];
const petList = document.getElementById('petList');

// Render the list of pets
const renderPets = () => {
    petList.innerHTML = ''; // Clear the list before rendering
    if (pets.length === 0) {
        petList.innerHTML = '<li>No pets registered yet.</li>';
    } else {
        pets.forEach((pet, index) => {
            const li = document.createElement('li');
            li.textContent = `Pet Name: ${pet.petName}, User: ${pet.userId}, Breed: ${pet.petBreed}, Type: ${pet.petType}, Weight: ${pet.petWeight}, Height: ${pet.petHeight}`;

            // Create buttons for editing or deleting pets
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editPet(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deletePet(index));

            // Append buttons to each pet list item
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            // Append the list item to the pet list
            petList.appendChild(li);
        });
    }
};

// Add a new pet
document.getElementById('addPetBtn').addEventListener('click', () => {
    const petName = document.getElementById('petName').value;
    const userId = document.getElementById('userId').value;
    const petBreed = document.getElementById('petBreed').value;
    const petType = document.getElementById('petType').value;
    const petWeight = document.getElementById('petWeight').value;
    const petHeight = document.getElementById('petHeight').value;

    // Validate input
    if (petName && userId && petBreed && petType && petWeight && petHeight) {
        // Create a new pet object
        const newPet = {
            petName,
            userId,
            petBreed,
            petType,
            petWeight,
            petHeight
        };

        // Add the new pet to the list
        pets.push(newPet);
        
        // Save the updated pet list back to local storage
        localStorage.setItem('pets', JSON.stringify(pets));

        // Clear the form and re-render the list
        document.getElementById('petName').value = '';
        document.getElementById('userId').value = '';
        document.getElementById('petBreed').value = '';
        document.getElementById('petType').value = '';
        document.getElementById('petWeight').value = '';
        document.getElementById('petHeight').value = '';

        renderPets();
    } else {
        alert('Please fill all the fields!');
    }
});

// Edit a pet's details
const editPet = (index) => {
    const pet = pets[index];
    // Prompt the admin to update the pet's details
    const newPetName = prompt('Edit Pet Name:', pet.petName);
    if (newPetName !== null) {
        pet.petName = newPetName;
    }
    const newPetBreed = prompt('Edit Pet Breed:', pet.petBreed);
    if (newPetBreed !== null) {
        pet.petBreed = newPetBreed;
    }
    const newPetType = prompt('Edit Pet Type:', pet.petType);
    if (newPetType !== null) {
        pet.petType = newPetType;
    }
    const newPetWeight = prompt('Edit Pet Weight:', pet.petWeight);
    if (newPetWeight !== null) {
        pet.petWeight = newPetWeight;
    }
    const newPetHeight = prompt('Edit Pet Height:', pet.petHeight);
    if (newPetHeight !== null) {
        pet.petHeight = newPetHeight;
    }

    // Save the updated pet data back to localStorage
    localStorage.setItem('pets', JSON.stringify(pets));

    // Re-render the pets list
    renderPets();
};

// Delete a pet
const deletePet = (index) => {
    if (confirm('Are you sure you want to delete this pet?')) {
        // Remove the pet from the pets array
        pets.splice(index, 1);

        // Save the updated pet list back to local storage
        localStorage.setItem('pets', JSON.stringify(pets));

        // Re-render the pets list
        renderPets();
    }
};

// Initialize the pet list on page load
renderPets();
