import { useState, useEffect, useCallback, useMemo } from 'react';
import { walletApi } from '../api/walletApi';

export const useAssetData = (asset) => {
  const [assetData, setAssetData] = useState(null);
  const [assetTransactions, setAssetTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  const fetchAssetData = useCallback(async () => {
    setLoading(true);
    const result = await walletApi.getAsset(asset.id);
    if (result.success) {
      setAssetData(result.data || []);
      setAssetTransactions(result.data.transactions || []);
    }
    setLoading(false);
  }, [asset.id]);

  useEffect(() => {
    fetchAssetData();
  }, [fetchAssetData]);

  return {
    assetData,
    assetTransactions,
    loading,
  };
};
