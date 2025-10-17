import React, { useState, memo, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';
import { useNavigation } from '/app/src/hooks/useNavigation';

const fallbackData = [];

const AllWalletsTable = memo(({ wallets }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { openItem } = useNavigation();

  // Определяем колонки для React Table
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Название',
      cell: ({ row }) => (
        <div className="d-grid name text-average" onClick={() => openItem(row.original, 'portfolio')}>
          <span>{row.original.name}</span>
          <span className="text-muted small-text capitalize">{row.original.market}</span>
          <span className="text-muted small-text">{row.original.assets?.length || 0} активов</span>
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: 'costNow',
      header: 'Стоимость',
      cell: ({ row }) => (
        <span className="">{formatCurrency(row.original.costNow)}</span>
      ),
      size: 200,
    },
    {
      accessorKey: 'share',
      header: 'Доля',
      // header: 'Доля от всех инвестиций',
      cell: ({ row }) => {
        return (
          <span className="text-muted">{formatPercentage(row.original.share)}</span>
        );
      },
      size: 120,
    },
    {
      accessorKey: 'buy_orders',
      header: 'В ордерах',
      // header: 'В ордерах на покупку',
      cell: ({ row }) => (
        <span>{formatCurrency(row.original.buyOrders)}</span>
      ),
      size: 120,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="action-buttons">
          <a className="link-secondary">
            <i className="bi bi-three-dots-vertical"></i>
          </a>
        </div>
      ),
      size: 100,
    },
  ], [openItem]);

  // Создаем таблицу
  const table = useReactTable({
    data: wallets ?? fallbackData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="table-wrapper">
      <div className="table-controls mb-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск по портфелям..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="big-table">
        <table className="table table-sm align-middle bootstrap-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() 
                            ? 'cursor-pointer select-none' 
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default AllWalletsTable;
