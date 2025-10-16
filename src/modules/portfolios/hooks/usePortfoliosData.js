import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '/app/src/hooks/useAuth.js'
import { useAssetsStore } from '/app/src/stores/assetsStore';
import { portfolioApi } from '../api/portfolioApi';

export const usePortfoliosData = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { prices, addAssets } = useAssetsStore();

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    const result = await portfolioApi.getAllPortfolios(user.id);
    if (result.success) {
      const portfoliosData = result.data.portfolios || [];
      setPortfolios(portfoliosData);
      addAssets(portfoliosData);
    }
    setLoading(false);
  }, [user.id, addAssets]);

  // Расчет статистики
  const { portfoliosWithStats, overallStats } = useMemo(() => {
    if (portfolios.length === 0) return { portfoliosWithStats: [], overallStats: {} };

    let totalCostNow = 0;
    let totalInvested = 0;
    let totalBuyOrders = 0;
    
    const portfoliosWithStats = portfolios.map(portfolio => {
      let costNow = 0;
      let invested = 0;
      let buyOrders = 0;

      portfolio.assets?.forEach(asset => {
        const currentPrice = prices[asset.asset_id] || 0;
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
  }, [portfolios, prices]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    portfolios: portfoliosWithStats,
    overallStats,
    loading,
    refetch: fetchPortfolios
  };
};
