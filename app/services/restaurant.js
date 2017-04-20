import axios from 'axios';

const service = {
  getDishes: (restaurant) => axios.get('/api/dish', { params: { restaurant }})
};

export default service;
