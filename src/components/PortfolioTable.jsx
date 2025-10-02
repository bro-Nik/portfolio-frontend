// components/PortfolioTable.jsx
import React, { useState, memo, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';

const fallbackData = [];

const PortfolioTable = memo(({ portfolios, onUpdate }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // const toggleRow = (portfolioId) => {
  // };

  // Определяем колонки для React Table
  const columns = useMemo(() => [
    {
      id: 'expand',
      header: '',
      cell: ({ row }) => (
        <input className="form-check-input to-check" type="checkbox" value="{{ portfolio.id }}"/>
      ),
      size: 60,
    },
    {
      accessorKey: 'name',
      header: 'Название',
      cell: ({ row }) => (
        <div className="d-grid name text-average">
          <span>{row.original.name}</span>
          <span className="text-muted small-text capitalize">{row.original.market}</span>
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: 'cost_now',
      header: 'Стоимость сейчас',
      cell: ({ row }) => (
        <span className="">
          {formatCurrency(row.original.cost_now)}
        </span>
      ),
      size: 200,
    },
    {
      accessorKey: 'amount',
      header: 'Вложено',
      cell: ({ row }) => (
        <span>
          {formatCurrency(row.original.amount)}
        </span>
      ),
      size: 120,
    },
    {
      accessorKey: 'profit',
      header: 'Прибыль / Убыток',
      cell: ({ row }) => (
        <span className="text-red">
          {formatCurrency(row.original.cost_now - row.original.amount)}
        </span>
      ),
      size: 120,
    },
    {
      accessorKey: 'share',
      header: 'Доля от всех инвестиций',
      cell: ({ row }) => (
        <span className="text-red">
          ~10%
        </span>
      ),
      size: 120,
    },
    {
      accessorKey: 'buy_orders',
      header: 'В ордерах на покупку',
      cell: ({ row }) => (
        <span className="text-red">
          {formatCurrency(row.original.buy_orders)}
        </span>
      ),
      size: 120,
    },
    {
      accessorKey: 'comment',
      header: 'Комментарий',
      cell: ({ row }) => (
        <div className="d-flex comment">
          <span className="text-truncate">
            {row.original.comment}
          </span>
        </div>
      ),
      size: 120,
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="bi bi-pencil"></i>
          </button>
        </div>
      ),
      size: 100,
    },
  ], []);

  // Создаем таблицу
  const table = useReactTable({
    data: portfolios ?? fallbackData,
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
    {/* Поиск и элементы управления */}
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

    <div class="big-table">
      {/* Таблица с использованием React Table */}
      <table class="table table-sm align-middle bootstrap-table">
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
            <tr 
              key={row.id}
              // onClick={() => toggleRow(row.original.id)}
            >
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

export default PortfolioTable;
