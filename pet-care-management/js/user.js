document.getElementById('addPetBtn').addEventListener('click', () => {
    document.getElementById('petForm').classList.remove('hidden');
});

document.getElementById('savePetBtn').addEventListener('click', () => {
    const petName = document.getElementById('petName').value;
    const petBreed = document.getElementById('petBreed').value;
    const petWeight = document.getElementById('petWeight').value;
    const petHeight = document.getElementById('petHeight').value;
    const petType = document.getElementById('petType').value;

    const pet = { petName, petBreed, petWeight, petHeight, petType };
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(pet);

    localStorage.setItem('pets', JSON.stringify(pets));
    alert('Pet registered successfully!');
    window.location.reload();
});
