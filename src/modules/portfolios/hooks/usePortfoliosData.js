import { useState, useEffect, useCallback, useMemo } from 'react';
import { portfolioApi } from '../api/portfolioApi';
import { useDataStore } from '/app/src/stores/dataStore';

export const usePortfoliosData = () => {
  // Берем данные из единого store
  const portfolios = useDataStore(state => state.portfolios);
  const assetPrices = useDataStore(state => state.assetPrices);
  const setPortfolios = useDataStore(state => state.setPortfolios);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await portfolioApi.getAllPortfolios();
      if (result.success) setPortfolios(result.data.portfolios || []);
    };

    // Загружаем только один раз
    if (portfolios === null) fetchInitialData();
  }, []); // Только при монтировании

  // Расчет статистики
  const { portfoliosWithStats, overallStats } = useMemo(() => {
    if (portfolios === null || portfolios.length === 0) return { portfoliosWithStats: [], overallStats: {} };

    let totalCostNow = 0;
    let totalInvested = 0;
    let totalBuyOrders = 0;
    
    const portfoliosWithStats = portfolios.map(portfolio => {
      let costNow = 0;
      let invested = 0;
      let buyOrders = 0;

      portfolio.assets?.forEach(asset => {
        const currentPrice = assetPrices[asset.asset_id] || 0;
        costNow += asset.quantity * currentPrice;
        invested += asset.amount;
        buyOrders += asset.buy_orders || 0;
      });

      const profit = costNow - invested;
      const profitPercentage = invested > 0 ? (profit / invested) * 100 : 0;

      totalCostNow += costNow;
      totalInvested += invested;
      totalBuyOrders += buyOrders;

      return {
        ...portfolio,
        costNow,
        invested,
        buyOrders,
        profit,
        profitPercentage
      };
    });

    const portfoliosWithStatsAndShare = portfoliosWithStats.map(portfolio => ({
      ...portfolio,
      share: totalInvested > 0 ? (portfolio.invested / totalInvested) * 100 : 0
    }));

    return {
      portfoliosWithStats: portfoliosWithStatsAndShare,
      overallStats: {
        totalCostNow,
        totalInvested,
        totalProfit: totalCostNow - totalInvested,
        totalBuyOrders
      }
    };
  }, [portfolios, assetPrices]);

  return {
    portfolios: portfoliosWithStats,
    overallStats,
    loading: portfolios === null
  };
};
