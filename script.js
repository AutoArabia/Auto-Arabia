// ===== Global Variables =====
const CARS_DATA_URL = 'cars.json';
const CURRENCY_SYMBOL = 'DHS'; // UAE Dirhams
let allCars = [];

// ===== Utility Functions =====
const formatPrice = (price) => {
  const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ''));
  return new Intl.NumberFormat('en-AE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice) + ' ' + CURRENCY_SYMBOL;
};

// Example outputs:
// formatPrice(18500) → "18,500 DHS"
// formatPrice("$25,999") → "25,999 DHS" (handles existing currency symbols)

// ===== Updated Car Card HTML Generator =====
const createCarCardHTML = (car) => {
  return `
    <div class="car-card" data-aos="fade-up" onclick="location.href='car-details.html?id=${car.id}'">
      <img src="${car.image}" alt="${car.make} ${car.model}" loading="lazy">
      <div class="car-info">
        <h3>${car.make} ${car.model} (${car.year})</h3>
        <p class="price">${formatPrice(car.price)}</p>
        <p class="availability ${car.available ? 'available' : 'sold'}">
          ${car.available ? 'متاح الآن' : 'مباع'} <!-- Arabic for Available/Sold -->
        </p>
      </div>
    </div>
  `;
};

// ===== Updated Car Details Generator =====
const generateCarDetailsHTML = (car) => {
  return `
    <div class="car-gallery">
      <img id="main-image" src="${car.image}" alt="${car.make} ${car.model}" class="main-image">
      <div class="thumbnail-container" id="thumbnails">
        ${car.images?.map(img => `
          <img src="${img}" class="thumbnail" onclick="document.getElementById('main-image').src='${img}'">
        `).join('') || ''}
      </div>
    </div>
    <div class="car-info">
      <h1>${car.make} ${car.model} (${car.year})</h1>
      <div class="price-tag">${formatPrice(car.price)}</div>
      <span class="availability-badge ${car.available ? 'available' : 'sold'}">
        ${car.available ? 'متاح' : 'مباع'}
      </span>
      
      <div class="specs-grid">
        <div class="spec-item"><strong>السعر:</strong> ${formatPrice(car.price)}</div>
        <div class="spec-item"><strong>الطراز:</strong> ${car.make}</div>
        <div class="spec-item"><strong>الموديل:</strong> ${car.model}</div>
        <div class="spec-item"><strong>السنة:</strong> ${car.year}</div>
        <div class="spec-item"><strong>الكيلومترات:</strong> ${car.mileage || 'غير متوفر'}</div>
        <div class="spec-item"><strong>ناقل الحركة:</strong> ${car.transmission || 'غير متوفر'}</div>
        <div class="spec-item"><strong>نوع الوقود:</strong> ${car.fuelType || 'غير متوفر'}</div>
        <div class="spec-item"><strong>رقم الهيكل:</strong> ${car.vin || 'غير متوفر'}</div>
      </div>
      
      <p class="car-description">${car.description || 'لا يوجد وصف إضافي.'}</p>
      
      <div class="contact-actions">
        <button class="btn btn-whatsapp" onclick="window.open('https://wa.me/971YOUR_PHONE_NUMBER?text=${encodeURIComponent(`أهلاً، أنا مهتم بـ ${car.make} ${car.model} (ID: ${car.id})`)}')">
          <i class="fab fa-whatsapp"></i> التواصل عبر واتساب
        </button>
        <button class="btn btn-call" onclick="window.location.href='tel:+971YOUR_PHONE_NUMBER'">
          <i class="fas fa-phone"></i> اتصل الآن
        </button>
      </div>
    </div>
  `;
};

// ===== Data Loading and Display =====
const loadAndDisplayCars = async () => {
  try {
    const response = await fetch(CARS_DATA_URL);
    if (!response.ok) throw new Error("Failed to load cars data");
    allCars = await response.json();
    
    // Check where we are and load appropriate content
    if (document.getElementById('featured-cars')) {
      loadFeaturedCars();
    } else if (document.getElementById('inventory-grid')) {
      loadInventoryCars();
    } else if (document.getElementById('car-details-container')) {
      loadCarDetails();
    }
  } catch (error) {
    console.error("Error loading cars:", error);
    // Fallback UI
    document.querySelector('main').innerHTML = `
      <div class="error">
        <p>Failed to load car data. Please refresh the page.</p>
      </div>
    `;
  }
};

// Homepage - Featured Cars
const loadFeaturedCars = () => {
  const featuredCars = allCars.cars.slice(0, 5); // First 5 cars
  const container = document.getElementById('featured-cars');
  
  container.innerHTML = featuredCars.map(car => 
    createCarCardHTML(car)
  ).join('');

  // Add "View All" card
  container.innerHTML += `
    <div class="car-card inventory-link" onclick="location.href='inventory.html'">
      <div class="car-info">
        <h3>View Full Inventory →</h3>
        <p>${allCars.cars.length} cars available</p>
      </div>
    </div>
  `;
};

// Inventory Page - All Cars
const loadInventoryCars = () => {
  const container = document.getElementById('inventory-grid');
  container.innerHTML = allCars.cars.map(car => 
    createCarCardHTML(car)
  ).join('');
};

// Car Details Page
const loadCarDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  const container = document.getElementById('car-details-container');
  
  const car = allCars.cars.find(c => c.id == carId);
  if (!car) {
    window.location.href = 'inventory.html';
    return;
  }

  container.innerHTML = generateCarDetailsHTML(car);
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadAndDisplayCars);

// Make sort function available globally
window.sortCars = (order) => {
  const container = document.getElementById('inventory-grid');
  if (!container) return;

  const sorted = [...allCars.cars].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return order === 'low-to-high' ? priceA - priceB : priceB - priceA;
  });

  container.innerHTML = sorted.map(car => 
    createCarCardHTML(car)
  ).join('');
};
