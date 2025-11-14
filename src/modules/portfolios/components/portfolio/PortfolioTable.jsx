import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { useDataStore } from '/app/src/stores/dataStore';
import AssetActionsDropdown from '../AssetActionsDropdown';
import {
  createCostColumn,
  createShareColumn,
  createBuyOrdersColumn,
  createProfitColumn,
  createInvestedColumn,
  createAssetNameColumn,
  createQuantityColumn,
  createAveragePriceColumn,
  createActionsColumn
} from '/app/src/features/tables/tableColumns';

const PortfolioTable = memo(({ portfolio, assets }) => {
  const { openItem } = useNavigation();
  const prices = useDataStore(state => state.assetPrices);
  const info = useDataStore(state => state.assetInfo);

  // Подготавливаем данные для таблицы
  const preparedAssets = useMemo(() => {
    if (!assets) return [];

    return assets.map(asset => {
      const ticker = info[asset.tickerId];

      return {
        ...asset,
        share: portfolio.costNow > 0 ? (asset.costNow / portfolio.costNow) * 100 : 0,
        image: ticker.image,
        name: ticker.name,
        symbol: ticker.symbol.toUpperCase(),
      };
    });
  }, [assets, prices]);

  const columns = useMemo(() => [
    createAssetNameColumn(openItem, 'portfolio_asset', portfolio.id),
    createQuantityColumn((a) => a.symbol, (a) => !a.quantity),
    createAveragePriceColumn((a) => !a.averagePrice),
    createCostColumn((a) => !a.quantity),
    createInvestedColumn((a) => !a.quantity),
    createProfitColumn((a) => !a.quantity),
    createShareColumn((a) => !a.quantity),
    createBuyOrdersColumn((a) => !a.quantity && !a.buyOrders),
    createActionsColumn(({ row }) => <AssetActionsDropdown portfolio={portfolio} asset={row.original} btn='icon' />),
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
