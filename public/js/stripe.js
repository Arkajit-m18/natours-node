/* eslint-disable */

import axios from 'axios';

import { showAlert } from './alert';

const stripe = Stripe('pk_test_poMIyXRk0ctfJGKxpJYeHa94');

export const bookTour = async (tourId) => {
  try {
    // Get session from server
    const res = await axios.get(`/api/v1/bookings/checkout-session/${tourId}`);

    // Create a checkout form + charge card
    await stripe.redirectToCheckout({ sessionId: res.data.session.id });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
