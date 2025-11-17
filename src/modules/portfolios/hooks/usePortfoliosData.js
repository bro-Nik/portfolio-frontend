import { useEffect, useMemo, useRef } from 'react';
import { portfolioApi } from '../api/portfolioApi';
import { useDataStore } from '/app/src/stores/dataStore';

export const usePortfoliosData = () => {
  // Берем данные из единого store
  const portfolios = useDataStore(state => state.portfolios);
  const prices = useDataStore(state => state.assetPrices);
  const setPortfolios = useDataStore(state => state.setPortfolios);

  // Отслеживание первоначальной загрузки
  const initialLoadRef = useRef(false);

  const getPortfolio = (portfolioId) => {
    return portfolios?.find(portfolio => portfolio.id === portfolioId) || null;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      initialLoadRef.current = true;
      const result = await portfolioApi.getAllPortfolios();
      if (result.success) setPortfolios(result.data.portfolios || []);
    };

    // Загружаем только один раз
    if (!initialLoadRef.current) fetchInitialData();
  }, [setPortfolios]);

  // Расчет статистики
  const { portfoliosWithStats, overallStats } = useMemo(() => {
    if (portfolios === null || portfolios.length === 0) return { portfoliosWithStats: [], overallStats: {} };

    let totalCostNow = 0;
    let totalInvested = 0;
    let totalBuyOrders = 0;
    let totalProfit = 0;
    
    // Расчет статистики для каждого портфеля
    const portfoliosWithStats = portfolios.map(portfolio => {
      let costNow = 0;
      let invested = 0;
      let buyOrders = 0;
      let profit = 0;

      // Расчет статистики для каждого актива
      const assetsWithStats = portfolio.assets?.map(asset => {
        const price = prices[asset.tickerId] || 0;
        const assetCostNow = asset.quantity * price;
        const assetInvested = asset.amount;
        const assetAveragePrice = assetInvested / asset.quantity;
        const assetProfit = assetAveragePrice ? assetCostNow - assetInvested : 0;

        costNow += assetCostNow;
        invested += assetInvested;
        buyOrders += asset.buyOrders || 0;
        profit += assetProfit;

        return {
          ...asset,
          costNow: assetCostNow,
          averagePrice: assetAveragePrice,
          invested: assetInvested,
          profit: assetProfit,
          price
        };
      }) || [];

      totalCostNow += costNow;
      totalInvested += invested;
      totalBuyOrders += buyOrders;
      totalProfit += profit;

      return {
        ...portfolio,
        assets: assetsWithStats,
        costNow,
        invested,
        buyOrders,
        profit,
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
        totalProfit,
        totalBuyOrders
      }
    };
  }, [portfolios, prices]);

  return {
    portfolios: portfoliosWithStats,
    overallStats,
    loading: portfolios === null,
    getPortfolio
  };
};

export const usePortfolio = (portfolioId) => {
  return useDataStore(state => state.getPortfolio(portfolioId));
};
