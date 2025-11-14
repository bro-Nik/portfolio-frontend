import { formatCurrency, formatPercentage } from '/app/src/utils/format';

export const createNameColumn = (openItem, itemType = 'portfolio') => ({
  accessorKey: 'name',
  header: 'Название',
  cell: ({ row }) => (
    <div className="d-grid name text-average" onClick={() => openItem(row.original, itemType)}>
      <span>{row.original.name}</span>
      <span className="text-muted small-text capitalize">{row.original.market}</span>
      <span className="text-muted small-text">{row.original.assets?.length || 0} активов</span>
    </div>
  ),
  size: 300,
});

export const createAssetNameColumn = (openItem, itemType, parentId) => ({
  accessorKey: 'asset',
  header: 'Актив',
  cell: ({ row }) => (
    <div className="text-average d-flex gap-2 name" onClick={() => openItem(row.original, itemType, parentId)}>
      <img className="img-asset-min" loading="lazy" src={row.original.image} />
      <span className="text-truncate" title={row.original.name}>{row.original.name}</span>
      <span className="text-muted text-uppercase">{row.original.symbol}</span>
    </div>
  ),
  size: 300,
});

export const createCostColumn = () => ({
  accessorKey: 'costNow',
  header: 'Стоимость',
  cell: ({ row }) => (
    <span className="">{formatCurrency(row.original.costNow)}</span>
  ),
  size: 200,
});

export const createAveragePriceColumn = () => ({
  accessorKey: 'averagePrice',
  header: 'Средняя цена',
  cell: ({ row }) => (
    <span className="">{formatCurrency(row.original.averagePrice) || '-'}</span>
  ),
  size: 200,
});

// export const createQuantityColumn = (color = false) => ({
//   accessorKey: 'quantity',
//   header: 'Количество',
//   cell: ({ row }) => (
//     <span className="">{row.original.quantity}</span>
//   ),
//   size: 200,
// });

export const createQuantityColumn = (ticker = '', className = '', znak = '') => ({
  accessorKey: 'quantity',
  header: 'Количество',
  cell: ({ row }) => {
    const quantity = row.original.quantity;
    ticker = ticker ? ticker.toUpperCase() : '';
    return (<span className={className}>{znak}{quantity} {ticker}</span>);
  },
  size: 200,
});

export const createShareColumn = () => ({
  accessorKey: 'share',
  header: 'Доля',
  cell: ({ row }) => (
    <span className="text-muted">{formatPercentage(row.original.share)}</span>
  ),
  size: 120,
});

export const createProfitColumn = () => ({
  accessorKey: 'profit',
  header: 'Прибыль',
  // header: 'Прибыль / Убыток',
  cell: ({ row }) => {
    const profit = row.original.profit;
    const isPositive = profit >= 0;
    return (
      <span className={isPositive ? 'text-green' : 'text-red'}>
        {formatCurrency(profit)} ({formatPercentage(row.original.profitPercentage)})
      </span>
    );
  },
  size: 120,
});

export const createInvestedColumn = () => ({
  accessorKey: 'invested',
  header: 'Вложено',
  cell: ({ row }) => (
    <span>{formatCurrency(row.original.invested)}</span>
  ),
  size: 120,
});

export const createBuyOrdersColumn = () => ({
  accessorKey: 'buy_orders',
  header: 'В ордерах на покупку',
  cell: ({ row }) => {formatCurrency(row.original.buyOrders)},
  size: 120,
});

export const createSellOrdersColumn = () => ({
  accessorKey: 'sell_orders',
  header: 'В ордерах на продажу',
  cell: ({ row }) => {formatCurrency(row.original.sellOrders)},
  size: 120,
});

export const createActionsColumn = (renderElement) => ({
  id: 'actions',
  header: '',
  cell: (props) => renderElement(props),
  size: 100,
});
