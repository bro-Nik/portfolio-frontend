import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/portfolios', getValidToken);

export const portfolioApi = {
  getAllPortfolios: (userId) => api.get('/'),
  getAsset: (id) => api.get(`/assets/${id}`),
};
