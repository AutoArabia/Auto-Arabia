const cars = [
    {
        name: "Toyota Corolla",
        price: "Dhs 20,000",
        image: "https://i.imgur.com/t6BDdM2.jpeg",
        link: "https://www.instagram.com/p/DChbGclTmsS/?igsh=NTMweHl0NnJ4emxx"
    },
];

// Function to display cars
function displayCars() {
    const carList = document.getElementById("car-list");
    carList.innerHTML = "";
    
    cars.forEach(car => {
        carList.innerHTML += `
            <div class="car">
                <img src="${car.image}" alt="${car.name}">
                <h2>${car.name}</h2>
                <p>Price: ${car.price}</p>
                <a href="${car.link}" target="_blank">View on Instagram</a>
            </div>
        `;
    });
}

// Function to filter cars by search
function filterCars() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchValue));
    
    const carList = document.getElementById("car-list");
    carList.innerHTML = "";

    filteredCars.forEach(car => {
        carList.innerHTML += `
            <div class="car">
                <img src="${car.image}" alt="${car.name}">
                <h2>${car.name}</h2>
                <p>Price: ${car.price}</p>
                <a href="${car.link}" target="_blank">View on Instagram</a>
            </div>
        `;
    });
}

// Load cars when the page loads
window.onload = displayCars;