/* eslint-disable */

import axios from 'axios';

import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? '/api/v1/users/update-my-password'
      : '/api/v1/users/update-me';

  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
