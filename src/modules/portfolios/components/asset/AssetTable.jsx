import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { formatCurrency } from '/app/src/utils/format';
import TransactionActionsDropdown from '../TransactionActionsDropdown'
import TransactionEdit from '/app/src/modules/transaction/TransactionEdit';
import { useModalStore } from '/app/src/stores/modalStore';
import { useDataStore } from '/app/src/stores/dataStore';
import { useNavigation } from '/app/src/hooks/useNavigation';
import {
  createCostColumn,
  createShareColumn,
  createBuyOrdersColumn,
  createProfitColumn,
  createInvestedColumn,
  createAssetNameColumn,
  createQuantityColumn,
  createAveragePriceColumn
} from '/app/src/features/tables/tableColumns';

const AssetTable = memo(({ portfolio, asset, transactions }) => {
  const { openModal } = useModalStore();
  const info = useDataStore(state => state.assetInfo);
  const { openItem } = useNavigation();

  const getSymbol = (tickerId) => {
    const ticker = info[tickerId];
    return ticker.symbol.toUpperCase();
  };

  const inverted = (transaction) => {
    if (isTrade(transaction.type)) return !(transaction.tickerId == asset.tickerId);
    if (isTransfer(transaction.type)) return !(transaction.portfolioId == portfolio.id);
    return false;
  };

  const getType = (transaction) => {
    if (!inverted(transaction)) return transaction.type;

    const oppositeMap = {
      'Buy': 'Sell',
      'Sell': 'Buy',
      'Input': 'Output',
      'Output': 'Input',
      'TransferIn': 'TransferOut',
      'TransferOut': 'TransferIn',
    };
    return oppositeMap[transaction.type];
  };

  const getTypeName = (transaction) => {
    const oppositeMap = {
      'Buy': 'Покупка',
      'Sell': 'Продажа',
      'Earning': 'Заработок',
      'Input': 'Ввод',
      'Output': 'Вывод',
      'TransferIn': 'Поступление',
      'TransferOut': 'Перевод',
    };
    let name = '';
    if (isTrade(transaction.type)) name = oppositeMap[transaction.type];
    else if (isTransfer(transaction.type)) name = oppositeMap[getType(transaction)];
    else name = oppositeMap[transaction.type];
    if (inverted(transaction) && isTrade(transaction.type)) name += ' ' + getSymbol(transaction.tickerId);
    return name;
  };

  const getClass = (type) => {
    return isSellType(type) ? 'text-red' : 'text-green';
  };

  const isSellType = (type) => {
    return ['Sell', 'Output', 'TransferOut'].includes(type);
  };

  const isTrade = (type) => {
    return ['Buy', 'Sell'].includes(type);
  };

  const isTransfer = (type) => {
    return ['TransferIn', 'TransferOut'].includes(type);
  };

  const isInputOutput = (type) => {
    return ['Input', 'Output'].includes(type);
  };

  console.log(asset)
  console.log(transactions)
  const columns = useMemo(() => [
    {
      accessorKey: 'type',
      header: 'Тип',
      cell: ({ row }) => (
        <div onClick={() => openModal(TransactionEdit, { asset, portfolioId: portfolio.id, transaction: row.original })} >
          <span className={getClass(getType(row.original))}>{getTypeName(row.original)}{row.original.order ? '(Ордер)' : ''}</span>
          <br />
          <span className="small-text text-muted">{row.original.date}</span>
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: 'price',
      header: 'Цена',
      cell: ({ row }) => {
        if (isTrade(row.original.type)) return (
          <>
          <span>{formatCurrency(row.original.priceUsd)}</span>
          <br />
          {/* ToDo динамические тикеры */}
          <span class="small-text text-muted">{formatCurrency(row.original.price, 'USDT')}</span>
          </>
        );
        return '-';
      },
      size: 120,
    },
    {
      accessorKey: 'sum',
      header: 'Сумма',
      cell: ({ row }) => {
        if (isTrade(row.original.type)) return (
        <>
        <span>{isSellType(row.original.type) ? '+' : '-'}{formatCurrency(row.original.priceUsd * row.original.quantity)}</span>
        <br />
        {/* ToDo динамические тикеры */}
        <span className={!inverted(row.original) ? 'text-muted' : getClass(getType(row.original)) + ' small-text'}>{isSellType(row.original.type) ? '+' : '-'}{formatCurrency(row.original.quantity2, 'USDT')}</span>
        </>
        );
        return '-';
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Количество',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        return (
          <span className={inverted(row.original) ? '' : getClass(row.original.type)}>
            {isSellType(row.original.type) ? '-' : '+'}{quantity} {getSymbol(row.original.tickerId)}
          </span>
        );
      },
      size: 200,
    },
    {
      accessorKey: 'rel',
      header: 'Связь',
      cell: ({ row }) => {
        if (row.original.portfolio2Id) return (
          <div className="text-average d-flex gap-2 name" onClick={() => openItem(row.original.portfolio2Id, 'portfolio')}>
            Портфель {row.original.portfolio2Id}
          </div>
        );
        if (row.original.walletId) return (
          <div className="text-average d-flex gap-2 name" onClick={() => openItem(row.original.walletId, 'wallet')}>
            Кошелек {row.original.walletId}
          </div>
        );
        return '-';
      },
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
      cell: ({ row }) => <TransactionActionsDropdown transaction={row.original} btn='icon' />,
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
