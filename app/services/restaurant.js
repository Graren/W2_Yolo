import axios from 'axios';

const service = {
  getDishes: () => axios.get('/api/dish')
};

export default service;
