// ===== Smooth Scroll to Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      } else {
        window.scrollTo(0, target.offsetTop - 80);
      }
    } else {
      console.warn(`Target not found for anchor: ${targetId}`);
    }
  });
});

// ===== Header Scroll Effects =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
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
    height: ${window.innerWidth >= 768 ? '4px' : '2px'};
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
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
      img.src = img.dataset.src;
      img.loading = 'lazy';
    } else {
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

      imageObserver.observe(img);
    }
  });
};

// ===== Animate Elements on Scroll =====
const throttle = (callback, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
};

const animateOnScroll = () => {
  const animateElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    throttle((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.dataset.animate);
          observer.unobserve(entry.target);
        }
      });
    }, 100),
    { threshold: 0.1 }
  );

  animateElements.forEach(el => observer.observe(el));
};

// ===== Back-to-Top Button =====
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  button.setAttribute('aria-label', 'Scroll to top');
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

// ===== Parallax Effect for Hero Section (Optional) =====
const parallaxEffect = () => {
  const hero = document.querySelector('.hero');
  if (!hero || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    hero.style.backgroundPositionY = `${scrollValue * 0.5}px`;
  });
};

// ===== Initialize All Scroll Effects =====
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  animateOnScroll();
  createBackToTopButton();
  parallaxEffect();

  // Add smooth scroll to entire document
  document.documentElement.style.scrollBehavior = 'smooth';
});
