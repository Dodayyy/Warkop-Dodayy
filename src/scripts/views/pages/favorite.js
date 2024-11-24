import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Restoran Favorit Anda</h2>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (!restaurants.length) {
      restaurantsContainer.innerHTML = `
        <div class="restaurant-item__not__found">
          You don't have any favorite restaurants yet
        </div>
      `;
      return;
    }

    restaurantsContainer.innerHTML = restaurants.map((restaurant) => createRestaurantItemTemplate(restaurant)).join('');
  },
};

export default Favorite;
