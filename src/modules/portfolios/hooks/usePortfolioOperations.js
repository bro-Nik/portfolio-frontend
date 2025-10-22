import { useState } from 'react';
import { portfolioService } from '../services/portfolioService'
import { useNavigation } from '/app/src/hooks/useNavigation';
import { useDataStore } from '/app/src/stores/dataStore';
import { portfolioApi } from '../api/portfolioApi';

export const usePortfolioOperations = () => {
  const [loading, setLoading] = useState(false);

  const addPortfolioToStore = useDataStore(state => state.addPortfolio);
  const updatePortfolioInStore = useDataStore(state => state.updatePortfolio);
  const deletePortfolioFromStore = useDataStore(state => state.deletePortfolio);
  const { closeItem } = useNavigation();

  const editPortfolio = async (portfolio) => {
    // Валидация бизнес-правилами
    const validation = portfolioService.validateEdit(portfolio);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    
    setLoading(true);

    // Вызов API
    const result = await portfolioApi.savePortfolio(portfolio);

    // Редактирование
    if (result.success && portfolio.id) {
      updatePortfolioInStore(portfolio.id, result.data);
    }
    
    // Создание
    if (result.success && !portfolio.id) {
      addPortfolioToStore(result.data);
    }
    
    setLoading(false);
    return result;
  };
  
  const deletePortfolio = async (portfolio) => {
    // Валидация бизнес-правилами
    const validation = portfolioService.validateDelete(portfolio);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    
    setLoading(true);

    // Вызов API
    const result = await portfolioApi.deletePortfolio(portfolio.id);
    
    if (result.success) {
      deletePortfolioFromStore(portfolio.id);
      // Обновление состояния навигации
      closeItem(portfolio.id, 'portfolio')
    }
    
    setLoading(false);
    return result;
  };
  
  return { editPortfolio, deletePortfolio, loading };
};
