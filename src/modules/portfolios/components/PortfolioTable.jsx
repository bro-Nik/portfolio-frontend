import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { createCostColumn, createShareColumn, createBuyOrdersColumn,
  createProfitColumn, createInvestedColumn,
  createAssetNameColumn, createQuantityColumn, createAveragePriceColumn } from '/app/src/features/tables/tableColumns';
import { useDataStore } from '/app/src/stores/dataStore';
import AssetActionsDropdown from './AssetActionsDropdown';

const PortfolioTable = memo(({ portfolio, assets }) => {
  const { openItem } = useNavigation();
  const prices = useDataStore(state => state.assetPrices);
  const images = useDataStore(state => state.assetImages);

  // Подготавливаем данные для таблицы
  const preparedAssets = useMemo(() => {
    if (!assets) return [];

    return assets.map(asset => {
      const price = prices[asset.asset_id];
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
        image: `${process.env.REACT_APP_MARKET_SERVICE_URL}${images[asset.asset_id]}`,
        costNow,
        quantity: asset.quantity,
        buyOrders: asset.buy_orders || 0 // если есть поле ордеров
      };
    });
  }, [assets, prices]);

  const columns = useMemo(() => [
    createAssetNameColumn(openItem, 'portfolio_asset', portfolio.id),
    createQuantityColumn(),
    createAveragePriceColumn(),
    createCostColumn(),
    createInvestedColumn(),
    createProfitColumn(),
    createShareColumn(),
    createBuyOrdersColumn(),
    {
      id: 'actions',
      cell: ({ row }) => <AssetActionsDropdown portfolio={portfolio} asset={row.original} />,
      size: 100,
    },
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
