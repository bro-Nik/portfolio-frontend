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
  const info = useDataStore(state => state.assetInfo);

  // Подготавливаем данные для таблицы
  const preparedAssets = useMemo(() => {
    if (!assets) return [];

    return assets.map(asset => {
      const price = prices[asset.ticker_id];
      const costNow = asset.quantity * price;
      const invested = asset.amount;
      const profit = costNow - invested;
      const ticker = info[asset.ticker_id];

      return {
        ...asset,
        price,
        invested,
        averagePrice: invested / asset.quantity,
        profit,
        profitPercentage: invested > 0 ? (profit / invested) * 100 : 0,
        share: portfolio.costNow > 0 ? (costNow / portfolio.costNow) * 100 : 0,
        image: ticker.image,
        name: ticker.name,
        symbol: ticker.symbol,
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
