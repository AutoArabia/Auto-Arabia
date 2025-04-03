// ===== Smooth Scroll to Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Scroll Effects =====
const header = document.querySelector('header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
  // Shrink header on scroll
  if (window.scrollY > 50) {
    header.style.padding = '0.5rem 0';
    logo.style.width = '100px'; // Smaller logo
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    header.style.padding = '1.5rem 0';
    logo.style.width = '150px'; // Original logo size
    header.style.boxShadow = 'none';
  }
});

// ===== Scroll Progress Indicator =====
const createProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: black;
    z-index: 999;
    transition: width 0.1s;
    width: 0;
  `;
  document.body.prepend(progressBar);
  return progressBar;
};

const progressBar = createProgressBar();

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = `${scrolled}%`;
});

// ===== Lazy Load Images on Scroll =====
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// ===== Animate Elements on Scroll =====
const animateOnScroll = () => {
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.dataset.animate);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));
};

// ===== Back-to-Top Button =====
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: black;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 99;
  `;

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    button.style.opacity = window.scrollY > 300 ? '1' : '0';
  });
};

// ===== Initialize All Scroll Effects =====
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  animateOnScroll();
  createBackToTopButton();
  
  // Add smooth scroll to entire document
  document.documentElement.style.scrollBehavior = 'smooth';
});

// ===== Parallax Effect for Hero Section (Optional) =====
const parallaxEffect = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    hero.style.backgroundPositionY = `${scrollValue * 0.5}px`;
  });
};

// Export functions for modular use (if needed)
export {
  lazyLoadImages,
  animateOnScroll,
  parallaxEffect
};