document.addEventListener("DOMContentLoaded", function () {
    const carList = document.getElementById("car-list");
    const searchInput = document.getElementById("search");

    // Sample car data
    const cars = [
        { name: "Toyota Corolla", price: "Dhs 25,000", image: "https://i.imgur.com/t6BDdM2.jpeg", link: "https://www.instagram.com/p/DChbGclTmsS/?igsh=NTMweHl0NnJ4emxx", status: "Sold"}
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
                <p class="status ${car.status}">${car.status}</p> <!-- Display status -->
                <a href="${car.link}" target="_blank">View on Instagram</a>
            `;
            carList.appendChild(carItem);
        });
    }

    // Initial display of cars
    displayCars();

    // Search functionality
    searchInput.addEventListener("input", function () {
        displayCars(this.value); // Filter and update the display based on search input
    });
});
