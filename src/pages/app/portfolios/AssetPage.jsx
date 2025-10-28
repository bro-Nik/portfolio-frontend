import React from 'react';
import AssetHeader from '/app/src/modules/portfolios/components/AssetHeader';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';
import { useAssetData } from '/app/src/modules/portfolios/hooks/useAssetData';
import AssetStatistic from '/app/src/modules/portfolios/components/AssetStatistic';
import AssetDetails from '/app/src/modules/portfolios/components/AssetDetails';
import { useDataStore } from '/app/src/stores/dataStore';

const AssetPage = ({ portfolio, asset }) => {
  const { assetData, loading } = useAssetData(asset);
  const info = useDataStore(state => state.assetInfo);

  const preparedAssets = useMemo(() => {
    const ticker = info[asset.tickerId];

    return {
      ...asset,
      share: portfolio.costNow > 0 ? (asset.costNow / portfolio.costNow) * 100 : 0,
      image: ticker.image,
      name: ticker.name,
      symbol: ticker.symbol,
    };
  }, [asset]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="asset-detail">
      <AssetHeader portfolio={portfolio} asset={asset} data={assetData} />
      <AssetStatistic portfolio={portfolio} asset={asset} />
      <AssetDetails data={assetData} />
    </div>
  );
};

export default AssetPage;
