import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDataStore } from '/app/src/stores/dataStore';
import { walletApi } from '../api/walletApi';

export const useWalletsData = () => {
  // Берем данные из единого store
  const wallets = useDataStore(state => state.wallets);
  const prices = useDataStore(state => state.assetPrices);
  const setWallets = useDataStore(state => state.setWallets);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await walletApi.getAllWallets();
      if (result.success) setWallets(result.data.wallets || []);
    };

    // Загружаем только один раз
    if (wallets === null) fetchInitialData();
  }, []); // Только при монтировании


  // Расчет статистики
  const { walletsWithStats, overallStats } = useMemo(() => {
    if (wallets === null || wallets.length === 0) return { walletsWithStats: [], overallStats: {} };

    let totalCostNow = 0;
    let totalInvested = 0;
    let totalBuyOrders = 0;
    
    const walletsWithStats = wallets.map(wallet => {
      let costNow = 0;
      let invested = 0;
      let buyOrders = 0;

      wallet.assets?.forEach(asset => {
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
        ...wallet,
        costNow,
        invested,
        buyOrders,
        profit,
        profitPercentage
      };
    });

    const walletsWithStatsAndShare = walletsWithStats.map(wallet => ({
      ...wallet,
      share: totalInvested > 0 ? (wallet.invested / totalInvested) * 100 : 0
    }));

    return {
      walletsWithStats: walletsWithStatsAndShare,
      overallStats: {
        totalCostNow,
        totalInvested,
        totalProfit: totalCostNow - totalInvested,
        totalBuyOrders
      }
    };
  }, [wallets, prices]);

  return {
    wallets: walletsWithStats,
    overallStats,
    loading: wallets === null
  };
};
