import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/portfolios', getValidToken);

export const portfolioApi = {
  getAllPortfolios: (userId) => api.get('/'),
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
  addAssetToPortfolio: (portfolioId, tickerId) => api.post(`/${portfolioId}/add`, {ticker_id: tickerId}),
  delAssetFromPortfolio: (portfolioId, assetId) => api.del(`/${portfolioId}/assets/${assetId}`),
};
