import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/wallets', getValidToken);

export const walletApi = {
  getAllWallets: () => api.get('/'),
};
