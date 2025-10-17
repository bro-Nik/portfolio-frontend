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

export const createCostColumn = () => ({
  accessorKey: 'costNow',
  header: 'Стоимость',
  cell: ({ row }) => (
    <span className="">{formatCurrency(row.original.costNow)}</span>
  ),
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
  header: 'В ордерах',
  cell: ({ row }) => (
    <span>{formatCurrency(row.original.buyOrders)}</span>
  ),
  size: 120,
});

export const createActionsColumn = () => ({
  id: 'actions',
  header: '',
  cell: () => (
    <div className="action-buttons">
      <a className="link-secondary">
        <i className="bi bi-three-dots-vertical"></i>
      </a>
    </div>
  ),
  size: 100,
});
