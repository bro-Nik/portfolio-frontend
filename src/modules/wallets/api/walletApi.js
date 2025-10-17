import { apiService } from '/app/src/services/api';

const api = apiService('/api/wallets');

export const walletApi = {
  // getAllPortfolios: (userId) => api.get(`/user/${userId}`),
  getAllWallets: (userId) => {
    console.log('Запрос портфелей...');
    return api.get(`/user/${userId}`);
  },
  // getPortfolio: (id) => api.get(`/${id}`),
  // getPortfolio: (id) => {
  //   console.log('Запрос активов портфеля...');
  //   return api.get(`/${id}/assets`);
  // },
  getAsset: (id) => {
    console.log('Запрос активов портфеля...');
    return api.get(`/assets/${id}/detail`);
  },
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`)
};
