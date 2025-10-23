// script.js

// Mobile menu toggle
function createMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-btn';
  menuButton.innerHTML = '<i class="fas fa-bars"></i>';
  
  menuButton.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = menuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  }); 
  navbar.insertBefore(menuButton, navbar.children[1]);
}
// Search functionality
function setupSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      console.log('Mencari:', searchTerm);
      // Implementasi pencarian sebenarnya di sini
      // Contoh: window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
}

// Profile dropdown functionality
function setupProfileDropdown() {
  const profileDropdown = document.querySelector('.profile-dropdown');
  const profileTrigger = document.querySelector('.profile-trigger');
  
  // Toggle dropdown
  profileTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    profileDropdown.classList.remove('active');
  });
  
  // Prevent dropdown from closing when clicking inside
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Handle dropdown item clicks
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const action = item.textContent.trim();
  
      switch(action) {
        case 'Manage Profile':
          console.log('Navigasi ke Manage Profile');
          // window.location.href = '/profile';
          break;
        case 'Settings':
          console.log('Navigasi ke Settings');
          // window.location.href = '/settings';
          break;
        case 'Logout':
          if(confirm('Apakah Anda yakin ingin logout?')) {
            console.log('Logout berhasil');
            // Implementasi logout sebenarnya
            // window.location.href = '/logout';
          }
          break;
      }
      
      // Close dropdown after action
      profileDropdown.classList.remove('active');
    });
  });
}
// Active menu highlight
function setupActiveMenu() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.nav-menu a');
  
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}
// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
  createMobileMenu();
  setupSearch();
  setupProfileDropdown();
  setupActiveMenu();
  
  // Initialize slider jika ada
  if (document.querySelector('.slider-container')) {
    initSlider();
  }
});

// Slider functions (jika diperlukan)
let currentSlide = 0;
const totalSlides = 6;
let autoSlideInterval;

function initSlider() {
  createDots();
  updateSlider();
  startAutoSlide();
}
function createDots() {
  const dotsContainer = document.getElementById('sliderDots');
  if (!dotsContainer) return;
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  const sliderWrapper = document.getElementById('sliderWrapper');
  if (!sliderWrapper) return;
  
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
  resetAutoSlide();
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
  resetAutoSlide();
}
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetAutoSlide();
}
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
function openTrailer(url) {
  window.open(url, '_blank');
}
// stp slide cuk
document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
  // nvigasi keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  // hero slider fungs
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.slide');
const totalHeroSlides = heroSlides.length;
let heroAutoSlideInterval;

// Initialize Hero Slider
function initHeroSlider() {
  createHeroDots();
  showHeroSlide(0);
  startHeroAutoSlide();
}

// Create navigation dots for hero slider
function createHeroDots() {
  const dotsContainer = document.getElementById('heroDots');
  for (let i = 0; i < totalHeroSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'hero-dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToHeroSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Show specific hero slide
function showHeroSlide(index) {
  // Hide all slides
  heroSlides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Show current slide
  heroSlides[index].classList.add('active');
  
  // Update dots
  const dots = document.querySelectorAll('.hero-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentHeroSlide = index;
}

// Next hero slide
function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  showHeroSlide(currentHeroSlide);
  resetHeroAutoSlide();
}

// Previous hero slide
function goToHeroSlide(index) {
  currentHeroSlide = index;
  showHeroSlide(currentHeroSlide);
  resetHeroAutoSlide();
}

// Previous hero slide
function prevHeroSlide() {
  currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  showHeroSlide(currentHeroSlide);
  resetHeroAutoSlide();
}

// Start auto slide for hero (10 detik)
function startHeroAutoSlide() {
  heroAutoSlideInterval = setInterval(nextHeroSlide, 10000); // 10 detik
}

// Reset auto slide timer
function resetHeroAutoSlide() {
  clearInterval(heroAutoSlideInterval);
  startHeroAutoSlide();
}

// Pause auto slide on hover
function setupHeroHoverPause() {
  const heroSection = document.querySelector('.hero');
  
  heroSection.addEventListener('mouseenter', () => {
    clearInterval(heroAutoSlideInterval);
  });
  
  heroSection.addEventListener('mouseleave', () => {
    startHeroAutoSlide();
  });
}

// Keyboard navigation for hero slider
function setupHeroKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevHeroSlide();
    } else if (e.key === 'ArrowRight') {
      nextHeroSlide();
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize other features
  createMobileMenu();
  setupSearch();
  setupProfileDropdown();
  setupActiveMenu();
  
  // Initialize hero slider
  initHeroSlider();
  setupHeroHoverPause();
  setupHeroKeyboardNav();
  
  // Initialize recommendation slider if exists
  if (document.querySelector('.slider-container')) {
    initSlider();
  }
});

// Update existing functions to avoid conflicts
function openTrailer(url) {
  window.open(url, '_blank');
}
});

//fungsi di menu profile
localStorage.setItem("favoriteMovies", JSON.stringify(["Inception", "Avatar", "Avengers"]));
localStorage.setItem("watchCount", 15);

