import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { createCostColumn, createShareColumn, createBuyOrdersColumn,
  createProfitColumn, createInvestedColumn,
  createAssetNameColumn, createQuantityColumn, createAveragePriceColumn } from '/app/src/features/tables/tableColumns';
import { formatCurrency } from '/app/src/utils/format';
import TransactionActionsDropdown from '/app/src/modules/portfolios/components/TransactionActionsDropdown'
import TransactionEdit from '/app/src/modules/transaction/TransactionEdit';
import { useModalStore } from '/app/src/stores/modalStore';

const AssetTable = memo(({ portfolio, asset, transactions }) => {
  const { openModal } = useModalStore();

  const columns = useMemo(() => [
    {
      accessorKey: 'type',
      header: 'Тип',
      cell: ({ row }) => (
        <div onClick={() => openModal(TransactionEdit, { asset, portfolioId: portfolio.id, transaction: row.original })} >
          <span className="text-green">{row.original.type}</span>
          <br />
          <span className="small-text text-muted">{row.original.date}</span>
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: 'price',
      header: 'Цена',
      cell: ({ row }) => (
        <span>{formatCurrency(row.original.price)}</span>
      ),
      size: 120,
    },
    {
      accessorKey: 'sum',
      header: 'Сумма',
      cell: ({ row }) => (
        <span>{formatCurrency(row.original.price)}</span>
      ),
      size: 120,
    },
    createQuantityColumn(),
    {
      accessorKey: 'rel',
      header: 'Связь',
      cell: ({ row }) => (
        <span></span>
      ),
      size: 120,
    },
    {
      accessorKey: 'comment',
      header: 'Комментарий',
      cell: ({ row }) => (
        <span>{row.original.comment}</span>
      ),
      size: 120,
    },
    {
      id: 'actions',
      cell: ({ row }) => <TransactionActionsDropdown transaction={row.original} />,
      size: 100,
    },
  ], []);

  return (
    <DataTable 
      data={transactions}
      columnsConfig={columns}
      // placeholder="Поиск по активам..."
      // children={portfolio.comment}
    />
  );
});

export default AssetTable;
