import { useState } from 'react';
import { useDataStore } from '/app/src/stores/dataStore';
import { transactionService } from '/app/src/modules/transaction/services/transactionService'
import { transactionApi } from '/app/src/modules/transaction/api/transactionApi';

export const useTransactionOperations = () => {
  const [loading, setLoading] = useState(false);

  const updatePortfoliosInStore = useDataStore(state => state.updatePortfolios);
  const updateWalletsInStore = useDataStore(state => state.updateWallets);

  const editTransaction = async (oldTransaction, newTransaction) => {
    // Валидация бизнес-правилами
    const validation = transactionService.validateEdit(newTransaction);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    
    setLoading(true);

    // Вызов API
    const result = await transactionApi.saveTransaction(newTransaction);

    // Редактирование
    if (result.success) {

      // Обновление портфелей
      if (result.data.portfolios) updatePortfoliosInStore(result.data.portfolios);

      // Обновление кошельков
      if (result.data.wallets) updateWalletsInStore(result.data.wallets);

    }
    
    setLoading(false);
    return result;
  };
  
  return { 
    editTransaction,
    loading
  };
};
