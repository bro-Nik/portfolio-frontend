import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/portfolios', getValidToken);

export const portfolioApi = {
  getAllPortfolios: () => api.get('/'),
  getPortfoliosByIds: (ids) => api.get('/', { params: { ids } }),
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
  getAsset: (assetId) => api.get(`/assets/${assetId}`),
  addAssetToPortfolio: (portfolioId, tickerId) => api.post(`/${portfolioId}/assets`, {ticker_id: tickerId}),
  delAssetFromPortfolio: (portfolioId, assetId) => api.del(`/${portfolioId}/assets/${assetId}`),
};
