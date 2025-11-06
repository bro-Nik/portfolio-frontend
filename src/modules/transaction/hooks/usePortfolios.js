import { useState, useEffect } from 'react';
import { portfolioApi } from '/app/src/modules/portfolios/api/portfolioApi';

export const usePortfolios = (transactionType) => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузка портфелей для переводов
  useEffect(() => {
    if (['TransferIn', 'TransferOut'].includes(transactionType)) {
      fetchPortfolios();
    }
  }, [transactionType]);

  const fetchPortfolios = async () => {
    setLoading(true);

    const response = await portfolioApi.getAllPortfolios();
    if (response.success) setPortfolios(response.data.portfolios);

    setLoading(false);
    return response.data;
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return {
    portfolios,
    loading,
    fetchPortfolios,
  };
};
