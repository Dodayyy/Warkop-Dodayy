/* eslint-disable indent */
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import testimoni from '../../../public/data/Testimoni.json';

const Home = {
  currentTestimonialIndex: 0,

  async render() {
    return `
      <section class="hero" aria-label="hero banner">
        <div class="hero__inner">
          <h2 class="hero__title">Welcome to Warkop Dodayy</h2>
          <p class="hero__tagline">Pesan Sekarang</p>
        </div>
      </section>
      <div class="content">
        <h2 class="content__heading">Jelajahi Restoran</h2>
        <div id="restaurants" class="restaurants">
          <div class="loader-container">
            <div class="loader"></div>
            <p class="loader-text">Memuat restoran...</p>
          </div>
        </div>
      </div>
      <section class="testimonials">
        <div id="testimonialContainer" class="testimonial-container">
          <div class="loader-container">
            <div class="loader"></div>
            <p class="loader-text">Memuat testimonial...</p>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const testimonialContainer = document.querySelector('#testimonialContainer');

    const renderRestaurants = async () => {
      try {
        const restaurants = await RestaurantSource.list();

        if (!restaurants.length) {
          restaurantsContainer.innerHTML = `
            <div class="restaurant-item_not_found">
              <i class="fa-solid fa-utensils"></i>
              <p>Tidak ada restoran yang ditemukan</p>
            </div>
          `;
          return;
        }

        restaurantsContainer.innerHTML = restaurants.map((restaurant) => createRestaurantItemTemplate(restaurant)).join('');
      } catch (error) {
        console.error('Error:', error);
        restaurantsContainer.innerHTML = `
          <div class="error">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>Gagal memuat restoran</p>
            <p>Silakan periksa koneksi Anda dan coba lagi</p>
            <button class="error-button" onclick="location.reload()">
              <i class="fa-solid fa-rotate"></i> Coba Lagi
            </button>
          </div>
        `;
      }
    };

    const renderTestimonials = () => {
      try {
        const { testimonials } = testimoni;

        const updateTestimonial = () => {
          const testimonial = testimonials[this.currentTestimonialIndex];
          testimonialContainer.innerHTML = `
            <div class="testimonials">
              <h2 class="testimonials__heading">Testimonials</h2>
              <div class="testimonial-container">
                <div class="testimonial-card">
                  <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                  </div>
                  <div class="testimonial-content">
                    <div class="testimonial-rating">
                      ${Array(testimonial.rating).fill('⭐').join('')}
                    </div>
                    <p class="testimonial-text">"${testimonial.comment}"</p>
                    <div class="testimonial-author">
                      <p class="author-name">${testimonial.name}</p>
                      <p class="testimonial-date">${new Date(testimonial.date).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                </div>
                <button id="nextTestimonial" class="testimonial-button" aria-label="Testimonial berikutnya">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          `;

          document.querySelector('#nextTestimonial').addEventListener('click', () => {
            this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % testimonials.length;
            updateTestimonial();
          });
        };

        updateTestimonial();
      } catch (error) {
        console.error('Error memuat testimonial:', error);
        testimonialContainer.innerHTML = `
          <div class="error">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>Gagal memuat testimonial</p>
            <button class="error-button" onclick="location.reload()">
              <i class="fa-solid fa-rotate"></i> Coba Lagi
            </button>
          </div>
        `;
      }
    };

    await renderRestaurants();
    renderTestimonials();
  },
};

export default Home;
