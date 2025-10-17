import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '/app/src/hooks/useAuth.js'
import { useAssetsStore } from '/app/src/stores/assetsStore';
import { walletApi } from '../api/walletApi';

export const useWalletsData = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { prices, addAssets } = useAssetsStore();

  const fetchWallets = useCallback(async () => {
    setLoading(true);
    const result = await walletApi.getAllWallets(user.id);
    if (result.success) {
      const walletsData = result.data.wallets || [];
      setWallets(walletsData);
      addAssets(walletsData);
    }
    setLoading(false);
  }, [user.id, addAssets]);

  // Расчет статистики
  const { walletsWithStats, overallStats } = useMemo(() => {
    if (wallets.length === 0) return { walletsWithStats: [], overallStats: {} };

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

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return {
    wallets: walletsWithStats,
    overallStats,
    loading,
    refetch: fetchWallets
  };
};
