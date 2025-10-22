import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/portfolios', getValidToken);

export const portfolioApi = {
  getAllPortfolios: (userId) => api.get('/'),
  // savePortfolio: (portfolioData) => api.post('/portfolio_settings'),
  savePortfolio: (portfolioData) => {
    if (portfolioData.id) {
      // Редактирование
      return api.put(`/${portfolioData.id}`, portfolioData);
    } else {
      // Создание
      return api.post('/', portfolioData);
    }
  },
  deletePortfolio: (portfolioId) => api.del(`/${portfolioId}`),
  getAsset: (id) => api.get(`/assets/${id}`),
};
