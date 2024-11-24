import '../styles/main.scss';
import DATA from '../public/data/DATA.json';
import DATAs from '../public/data/Testimoni.json';
import 'regenerator-runtime';

console.log('Hello Coders! :)');

document.addEventListener('DOMContentLoaded', () => {
  const renderRestaurants = () => {
    const restaurantsContainer = document.querySelector('.restaurant-container');
    restaurantsContainer.innerHTML = '';

    DATA.restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement('div');
      restaurantElement.className = 'restaurant-card';
      restaurantElement.setAttribute('role', 'listitem');
      restaurantElement.setAttribute('tabindex', '0');
      restaurantElement.innerHTML = `
        <div class="restaurant-image">
          <img src="${restaurant.pictureId}" alt="${restaurant.name}" />
          <span class="city-badge" aria-label="Location: ${restaurant.city}">📍 ${restaurant.city}</span>
        </div>
        <div class="restaurant-info">
          <h3>${restaurant.name}</h3>
          <p class="rating" aria-label="Rating: ${restaurant.rating} stars">⭐ ${restaurant.rating}</p>
        </div>
        <p style="padding: 0 22px 22px; color: #555;">${restaurant.description.slice(0, 150)}...</p>
      `;

      restaurantElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log(`Selected restaurant: ${restaurant.name}`);
        }
      });

      restaurantsContainer.appendChild(restaurantElement);
    });
  };

  renderRestaurants();

  const renderTestimonials = () => {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    testimonialsContainer.innerHTML = '';

    DATAs.testimonials.forEach((testimonial) => {
      const testimonialElement = document.createElement('div');
      testimonialElement.className = 'testimonial-card';
      testimonialElement.setAttribute('role', 'listitem');
      testimonialElement.setAttribute('tabindex', '0');
      testimonialElement.setAttribute('aria-label', `Testimonial from ${testimonial.name}`); // Menambahkan aria-label
      testimonialElement.innerHTML = `
      <div class="testimonial-image">
  <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy" />
</div>
<div class="testimonial-info">
  <h3 class="testimonial-name">${testimonial.name}</h3>
  <p class="testimonial-role" aria-label="Role: ${testimonial.rating}">Rating : ⭐ ${testimonial.rating}</p>
  <p class="testimonial-message" aria-label="Message from ${testimonial.name}">${testimonial.text}</p>
</div>
    `;

      testimonialElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log(`Selected testimonial: ${testimonial.name}`);
        }
      });

      testimonialsContainer.appendChild(testimonialElement);
    });
  };

  renderTestimonials();
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  const navItems = document.querySelectorAll('.nav-menu li');
  navItems.forEach((item, index) => {
    item.style.setProperty('--i', index + 1);
  });

  document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      hamburgerMenu.classList.remove('open');
      navMenu.classList.remove('open');
      body.classList.remove('menu-open');
    }
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      hamburgerMenu.classList.remove('open');
      navMenu.classList.remove('open');
      body.classList.remove('menu-open');
    });
  });
});
