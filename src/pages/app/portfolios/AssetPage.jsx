import React from 'react';
import AssetHeader from '/app/src/modules/portfolios/components/AssetHeader';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';
import { useAssetData } from '/app/src/modules/portfolios/hooks/useAssetData';
import AssetStatistic from '/app/src/modules/portfolios/components/AssetStatistic';
import AssetDetails from '/app/src/modules/portfolios/components/AssetDetails';

const AssetPage = ({ asset, onClose, onMinimize }) => {
  const { assetData, loading } = useAssetData(asset);

  if (loading) return <LoadingSpinner />;

  if (!assetData) {
    return (
      <div className="asset-detail">
        <div className="alert alert-danger">Не удалось загрузить данные актива</div>
      </div>
    );
  }

  return (
    <div className="asset-detail">
      <AssetHeader data={assetData} />
      <AssetStatistic data={assetData} />
      <AssetDetails data={assetData} />
    </div>
  );
};

export default AssetPage;
