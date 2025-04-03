// ===== Encapsulation with IIFE =====
const CarApp = (() => {
  // Global Variables
  const CARS_DATA_URL = 'cars.json';
  const CURRENCY_SYMBOL = 'DHS'; // UAE Dirhams
  let allCars = [];

  // Utility Functions
  const formatPrice = (price, locale = 'en-AE', currency = 'DHS') => {
    const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ''));
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericPrice) + ' ' + currency;
  };

  // Example outputs:
  // formatPrice(18500) → "18,500 DHS"
  // formatPrice("$25,999") → "25,999 DHS" (handles existing currency symbols)

  // Car Card HTML Generator
  const createCarCardHTML = (car) => {
    return `
      <div class="car-card" data-aos="fade-up" onclick="location.href='car-details.html?id=${car.id}'" aria-label="View details for ${car.make} ${car.model}">
        <img src="${car.image}" alt="${car.make} ${car.model}" loading="lazy">
        <div class="car-info">
          <h3>${car.make} ${car.model} (${car.year})</h3>
          <p class="price">${formatPrice(car.price)}</p>
          <p class="availability ${car.available ? 'available' : 'sold'}">
            ${car.available ? 'Available Now' : 'Sold'}
          </p>
        </div>
      </div>
    `;
  };

  // Car Details HTML Generator
  const generateCarDetailsHTML = (car) => {
    return `
      <div class="car-gallery">
        <img id="main-image" src="${car.image}" alt="${car.make} ${car.model}" class="main-image">
        <div class="thumbnail-container" id="thumbnails">
          ${Array.isArray(car.images) && car.images.length > 0
            ? car.images.map(img => `
                <img src="${img}" class="thumbnail" onclick="document.getElementById('main-image').src='${encodeURIComponent(img)}'" alt="Thumbnail">
              `).join('')
            : '<p>No additional images available.</p>'
          }
        </div>
      </div>
      <div class="car-info">
        <h1>${car.make || 'Unknown Make'} ${car.model || 'Unknown Model'} (${car.year || 'Unknown Year'})</h1>
        <div class="price-tag">${formatPrice(car.price)}</div>
        <span class="availability-badge ${car.available ? 'available' : 'sold'}">
          ${car.available ? 'Available' : 'Sold'}
        </span>
        
        <div class="specs-grid">
          <div class="spec-item"><strong>Price:</strong> ${formatPrice(car.price)}</div>
          <div class="spec-item"><strong>Make:</strong> ${car.make || 'Not Available'}</div>
          <div class="spec-item"><strong>Model:</strong> ${car.model || 'Not Available'}</div>
          <div class="spec-item"><strong>Year:</strong> ${car.year || 'Not Available'}</div>
          <div class="spec-item"><strong>Mileage:</strong> ${car.mileage ? `${car.mileage.toLocaleString()} km` : 'Not Available'}</div>
          <div class="spec-item"><strong>Transmission:</strong> ${car.transmission || 'Not Available'}</div>
          <div class="spec-item"><strong>Fuel Type:</strong> ${car.fuelType || 'Not Available'}</div>
          <div class="spec-item"><strong>VIN:</strong> ${car.vin || 'Not Available'}</div>
        </div>
        
        <p class="car-description">${car.description || 'No additional description available.'}</p>
        
        <div class="contact-actions">
          <button class="btn btn-whatsapp" onclick="window.open('https://wa.me/${encodeURIComponent(car.contact?.whatsapp || '+971YOUR_PHONE_NUMBER')}?text=${encodeURIComponent(`Hello, I am interested in ${car.make} ${car.model} (ID: ${car.id})`)}')" aria-label="Send WhatsApp Inquiry">
            <i class="fab fa-whatsapp"></i> WhatsApp Inquiry
          </button>
          <button class="btn btn-call" onclick="window.location.href='tel:${encodeURIComponent(car.contact?.phone || '+971YOUR_PHONE_NUMBER')}'" aria-label="Call Dealer">
            <i class="fas fa-phone"></i> Call Now
          </button>
        </div>
      </div>
    `;
  };

  // Fetch Cars Data
  const fetchCarsData = () => {
    fetch(CARS_DATA_URL)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load cars.');
        return response.json();
      })
      .then(data => {
        allCars = data.cars;
        renderFeaturedCars();
      })
      .catch(error => {
        console.error('Error loading cars:', error);
        document.body.innerHTML = `
          <div style="text-align: center; margin-top: 5rem;">
            <h1>Error Loading Data</h1>
            <p>An unexpected error occurred. Please try again later.</p>
            <a href="index.html">Return to Home</a>
          </div>
        `;
      });
  };

  // Render Featured Cars
  const renderFeaturedCars = () => {
    const featuredCarsContainer = document.getElementById('featured-cars');
    if (featuredCarsContainer) {
      featuredCarsContainer.innerHTML = allCars
        .filter(car => car.available) // Show only available cars
        .slice(0, 6) // Limit to 6 cars
        .map(createCarCardHTML)
        .join('');
    }
  };

  // Initialize App
  const init = () => {
    fetchCarsData();
  };

  return {
    init
  };
})();

// Initialize the app
CarApp.init();
