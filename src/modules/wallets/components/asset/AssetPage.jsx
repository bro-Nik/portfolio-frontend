import React, { useMemo } from 'react';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';
import { useAssetData } from '/app/src/modules/wallets/hooks/useAssetData';
import { useDataStore } from '/app/src/stores/dataStore';
import AssetHeader from './AssetHeader';
import AssetStatistic from './AssetStatistic';
// import AssetDetails from './AssetDetails';
import AssetTable from './AssetTable';

const WalletAssetPage = ({ wallet, asset }) => {
  const { assetData, assetTransactions, loading } = useAssetData(asset);
  const info = useDataStore(state => state.assetInfo);

  const preparedAsset = useMemo(() => {
    const ticker = info[asset.tickerId];

    return {
      ...asset,
      share: wallet.costNow > 0 ? (asset.costNow / wallet.costNow) * 100 : 0,
      image: ticker.image,
      name: ticker.name,
      symbol: ticker.symbol,
      free: asset.quantity - asset.buyOrders
    };
  }, [asset]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="asset-detail">
      <AssetHeader wallet={wallet} asset={preparedAsset} data={assetData} />
      <AssetStatistic wallet={wallet} asset={preparedAsset} />
      {/* <AssetDetails data={assetData} /> */}
      <AssetTable wallet={wallet} asset={preparedAsset} transactions={assetTransactions} />
    </div>
  );
};

export default WalletAssetPage;
