import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

const { getValidToken } = authService();
const api = apiService('/api/transactions', getValidToken);

export const transactionApi = {
  saveTransaction: (transactionData) => {
    const url = `/transaction`;

    if (transactionData.id) {
      // Редактирование
      return api.put(`${url}/${transactionData.id}`, transactionData, true);
    } else {
      // Создание
      return api.post(url, transactionData, true);
    }
  },
};
