import { useState } from 'react';
import { useDataStore } from '/app/src/stores/dataStore';
import { transactionService } from '/app/src/modules/transaction/services/transactionService'
import { transactionApi } from '/app/src/modules/transaction/api/transactionApi';

const getUniqueIds = (...idArrays) => {
  const allIds = idArrays.flat();
  return [...new Set(allIds)].filter(id => id !== undefined && id !== null);
};

export const useTransactionOperations = () => {
  const [loading, setLoading] = useState(false);

  // const addPortfolioToStore = useDataStore(state => state.addPortfolio);
  // const updatePortfolioInStore = useDataStore(state => state.updatePortfolio);
  // const deletePortfolioFromStore = useDataStore(state => state.deletePortfolio);

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
      const portfolioIds = getUniqueIds(
        oldTransaction?.portfolioId, oldTransaction?.portfolio2Id,
        newTransaction.portfolioId, newTransaction.portfolio2Id
      );

      // ToDo обновление связанных портфелей и кошельков
      // const portfoliosResult = await portfolioApi.getPortfoliosByIds(portfolioIds);

      // Обновление кошельков
      const walletIds = getUniqueIds(
        oldTransaction?.walletId, oldTransaction?.wallet2Id,
        newTransaction.walletId, newTransaction.wallet2Id
      );
    }
    
    setLoading(false);
    return result;
  };
  
  return { 
    editTransaction,
    loading
  };
};
