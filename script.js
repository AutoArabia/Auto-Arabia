// cars data - this would normally come from an API or database
let cars = [
    {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2020,
        price: 12000,
        status: "AVAILABLE",
        location: "Paris",
        image: "https://via.placeholder.com/300x180?text=Toyota+Camry",
        description: "Excellent condition with low mileage. Fully serviced and ready to drive."
    },
    {
        id: 2,
        make: "Mercedes",
        model: "C-Class",
        year: 2019,
        price: 25000,
        status: "AVAILABLE",
        location: "Dubai",
        image: "https://via.placeholder.com/300x180?text=Mercedes+C-Class",
        description: "Luxury sedan with all the premium features. Well maintained."
    },
    {
        id: 3,
        make: "BMW",
        model: "X5",
        year: 2018,
        price: 35000,
        status: "SOLD",
        location: "Abu Dhabi",
        image: "https://via.placeholder.com/300x180?text=BMW+X5",
        description: "Powerful SUV with excellent performance and comfort."
    }
];

// Save cars to localStorage
function saveCarsToStorage() {
    localStorage.setItem('autoArabiaCars', JSON.stringify(cars));
}

// Load cars from localStorage
function loadCarsFromStorage() {
    const storedCars = localStorage.getItem('autoArabiaCars');
    if (storedCars) {
        cars = JSON.parse(storedCars);
    }
}

// Load cars on the main page
function loadCars() {
    loadCarsFromStorage();
    const carsContainer = document.getElementById('carsContainer');
    carsContainer.innerHTML = '';
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.onclick = () => viewCarDetails(car.id);
        
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
            <div class="car-info">
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Location: ${car.location}</p>
                <p class="price">Price: DHS ${car.price.toLocaleString()}</p>
                <p class="status-${car.status === 'AVAILABLE' ? 'available' : 'sold'}">Status: ${car.status}</p>
            </div>
        `;
        
        carsContainer.appendChild(carCard);
    });
}

// View car details
function viewCarDetails(carId) {
    window.location.href = `details.html?id=${carId}`;
}

// Load car details on the details page
function loadCarDetails() {
    loadCarsFromStorage();
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    const car = cars.find(c => c.id === carId);
    
    if (!car) {
        window.location.href = 'index.html';
        return;
    }
    
    const detailsContainer = document.getElementById('carDetails');
    detailsContainer.innerHTML = `
        <img src="${car.image}" alt="${car.make} ${car.model}" class="detail-image">
        <div class="detail-info">
            <h2>${car.make} ${car.model}</h2>
            <p>Year: ${car.year}</p>
            <p>Location: ${car.location}</p>
            <p class="price">Price: DHS ${car.price.toLocaleString()}</p>
            <p class="status-${car.status === 'AVAILABLE' ? 'available' : 'sold'}">Status: ${car.status}</p>
            <p>Description: ${car.description}</p>
        </div>
        <div class="edit-form">
            <h3>Edit Car Details</h3>
            <div class="form-group">
                <label for="editStatus">Status:</label>
                <select id="editStatus">
                    <option value="AVAILABLE" ${car.status === 'AVAILABLE' ? 'selected' : ''}>Available</option>
                    <option value="SOLD" ${car.status === 'SOLD' ? 'selected' : ''}>Sold</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editPrice">Price (DHS):</label>
                <input type="number" id="editPrice" value="${car.price}">
            </div>
            <button class="save-button" onclick="saveCarChanges(${carId})">Save Changes</button>
        </div>
    `;
}

// Save changes to car
function saveCarChanges(carId) {
    const carIndex = cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        cars[carIndex].status = document.getElementById('editStatus').value;
        cars[carIndex].price = parseInt(document.getElementById('editPrice').value);
        saveCarsToStorage();
        alert('Changes saved successfully!');
        loadCarDetails(); // Refresh the view
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const carCards = document.querySelectorAll('.car-card');
            
            carCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carsContainer')) {
        loadCars();
        setupSearch();
    }
});