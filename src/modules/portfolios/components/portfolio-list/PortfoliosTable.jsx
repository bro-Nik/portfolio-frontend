import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { useNavigation } from '/app/src/hooks/useNavigation';
import PortfolioActionsDropdown from '../PortfolioActionsDropdown'
import {
  createCostColumn,
  createShareColumn,
  createBuyOrdersColumn,
  createActionsColumn,
  createProfitColumn,
  createInvestedColumn,
  createNameColumn
} from '/app/src/features/tables/tableColumns';

const PortfoliosTable = memo(({ portfolios }) => {
  const { openItem } = useNavigation();

  const columns = useMemo(() => [
    createNameColumn(openItem, 'portfolio'),
    createCostColumn(),
    createInvestedColumn(),
    createProfitColumn(),
    createShareColumn(),
    createBuyOrdersColumn(),
    // createActionsColumn(),
    {
      id: 'actions',
      // header: '',
      cell: ({ row }) => <PortfolioActionsDropdown portfolio={row.original} />,
      size: 100,
    },
  ], [openItem]);

  return (
    <DataTable 
      data={portfolios}
      columnsConfig={columns}
      placeholder="Поиск по портфелям..."
    />
  );
});

export default PortfoliosTable;
