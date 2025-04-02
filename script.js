document.addEventListener("DOMContentLoaded", function () {
    const carList = document.getElementById("car-list");
    const searchInput = document.getElementById("search");

    // Sample car data
    const cars = [
        { 
            id: 1, // Unique ID for each car
            name: "Toyota Corolla", 
            price: "Dhs 25,000", 
            year: "2020", 
            engine: "2.0L 4-Cylinder", 
            regionalSpec: "GCC Specs", 
            contact: "+971 50 123 4567", 
            image: "https://i.imgur.com/t6BDdM2.jpeg", 
            status: "Available" 
        },
        { 
            id: 2,
            name: "Honda Civic", 
            price: "Dhs 30,000", 
            year: "2019", 
            engine: "1.8L Turbo", 
            regionalSpec: "American Specs", 
            contact: "+971 55 987 6543", 
            image: "https://i.imgur.com/someimage.jpeg", 
            status: "Sold" 
        }
    ];

    // Function to display cars
    function displayCars(filter = "") {
        carList.innerHTML = ""; // Clear previous cars
        cars.filter(car => car.name.toLowerCase().includes(filter.toLowerCase())).forEach(car => {
            const carItem = document.createElement("div");
            carItem.classList.add("car");
            carItem.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h2>${car.name}</h2>
                <p>${car.price}</p>
                <p class="status ${car.status}">${car.status}</p>
            `;

            // Make the entire car clickable
            carItem.addEventListener("click", function () {
                window.location.href = `car-details.html?id=${car.id}`;
            });

            carList.appendChild(carItem);
        });
    }

    // Initial display of cars
    displayCars();

    // Search functionality
    searchInput.addEventListener("input", function () {
        displayCars(this.value);
    });
});
