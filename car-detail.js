document.addEventListener("DOMContentLoaded", function () {
    // Sample car data (should match the data in script.js)
    const cars = [
        {id: 1,name: "Toyota Corolla",price: "Dhs 25,000",year: "2020",engine: "2.0L 4-Cylinder",regionalSpec: "GCC Specs",contact: "+971 50 123 4567", image: "https://i.imgur.com/t6BDdM2.jpeg",status: "Available"},
    ];

    // Get the car ID from the URL
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("id");

    // Find the car data
    const car = cars.find(car => car.id == carId);

    if (car) {
        document.getElementById("car-image").src = car.image;
        document.getElementById("car-name").textContent = car.name;
        document.getElementById("car-price").textContent = car.price;
        document.getElementById("car-year").textContent = car.year;
        document.getElementById("car-engine").textContent = car.engine;
        document.getElementById("car-spec").textContent = car.regionalSpec;
        document.getElementById("car-contact").textContent = car.contact;
        document.getElementById("car-status").textContent = car.status;
        document.getElementById("car-status").classList.add(car.status);
    } else {
        document.querySelector(".car-details-container").innerHTML = "<h2>Car not found</h2>";
    }
});