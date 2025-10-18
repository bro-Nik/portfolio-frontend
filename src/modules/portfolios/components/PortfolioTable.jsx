import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { createCostColumn, createShareColumn, createBuyOrdersColumn,
  createActionsColumn, createProfitColumn, createInvestedColumn,
  createAssetNameColumn, createQuantityColumn, createAveragePriceColumn } from '/app/src/features/tables/tableColumns';
import { useAssetsStore } from '/app/src/stores/assetsStore';

const PortfolioTable = memo(({ portfolio, assets }) => {
  const { openItem } = useNavigation();
  const { getAssetPrice, getAssetImage } = useAssetsStore();
  console.log(portfolio)

  // Подготавливаем данные для таблицы
  const preparedAssets = useMemo(() => {
    if (!assets) return [];

    return assets.map(asset => {
      const price = getAssetPrice(asset.asset_id);
      const costNow = asset.quantity * price;
      const invested = asset.amount;
      const profit = costNow - invested;

      return {
        ...asset,
        price,
        invested,
        averagePrice: invested / asset.quantity,
        profit,
        profitPercentage: invested > 0 ? (profit / invested) * 100 : 0,
        share: portfolio.costNow > 0 ? (costNow / portfolio.costNow) * 100 : 0,
        image: getAssetImage(asset.asset_id),
        costNow,
        quantity: asset.quantity,
        buyOrders: asset.buy_orders || 0 // если есть поле ордеров
      };
    });
  }, [assets, getAssetPrice]);

  const columns = useMemo(() => [
    createAssetNameColumn(openItem, 'portfolio_asset', portfolio.id),
    createQuantityColumn(),
    createAveragePriceColumn(),
    createCostColumn(),
    createInvestedColumn(),
    createProfitColumn(),
    createShareColumn(),
    createBuyOrdersColumn(),
    createActionsColumn(),
  ], [openItem]);

  return (
    <DataTable 
      data={preparedAssets}
      columnsConfig={columns}
      placeholder="Поиск по активам..."
      children={portfolio.comment}
    />
  );
});

export default PortfolioTable;
