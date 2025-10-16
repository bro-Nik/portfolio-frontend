import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '/app/src/hooks/useAuth.js'
import { useAssetsStore } from '/app/src/stores/assetsStore';
import { portfolioApi } from '../api/portfolioApi';

export const useAssetData = (asset) => {
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  const fetchAssetData = useCallback(async () => {
    setLoading(true);
    const result = await portfolioApi.getAsset(asset.id);
    if (result.success) {
      setAssetData(result.data || []);
    }
    setLoading(false);
  }, [asset.id]);

  useEffect(() => {
    fetchAssetData();
  }, [fetchAssetData]);

  return {
    assetData,
    loading,
  };
};
