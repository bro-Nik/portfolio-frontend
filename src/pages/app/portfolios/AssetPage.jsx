import React, { useMemo } from 'react';
import AssetHeader from '/app/src/modules/portfolios/components/AssetHeader';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';
import { useAssetData } from '/app/src/modules/portfolios/hooks/useAssetData';
import AssetStatistic from '/app/src/modules/portfolios/components/AssetStatistic';
import AssetDetails from '/app/src/modules/portfolios/components/AssetDetails';
import { useDataStore } from '/app/src/stores/dataStore';
import AssetTable from '/app/src/modules/portfolios/components/AssetTable';

const AssetPage = ({ portfolio, asset }) => {
  const { assetData, loading } = useAssetData(asset);
  const info = useDataStore(state => state.assetInfo);

  const preparedAsset = useMemo(() => {
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

  console.log('рендер страницы актива')
  console.log(assetData)

  return (
    <div className="asset-detail">
      <AssetHeader portfolio={portfolio} asset={preparedAsset} data={assetData} />
      <AssetStatistic portfolio={portfolio} asset={preparedAsset} />
      <AssetDetails data={assetData} />
      <AssetTable asset={asset} transactions={assetData.transactions} />
    </div>
  );
};

export default AssetPage;
