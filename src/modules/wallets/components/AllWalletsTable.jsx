import React, { memo, useMemo } from 'react';
import DataTable from '/app/src/features/tables/DataTable';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { createCostColumn, createShareColumn, createBuyOrdersColumn, createActionsColumn, createNameColumn } from '/app/src/features/tables/tableColumns';

const AllWalletsTable = memo(({ wallets }) => {
  const { openItem } = useNavigation();

  const columns = useMemo(() => [
    createNameColumn(openItem, 'wallet'),
    createCostColumn(),
    createShareColumn(),
    createBuyOrdersColumn(),
    createActionsColumn(),
  ], [openItem]);

  return (
    <DataTable 
      data={wallets}
      columnsConfig={columns}
      placeholder="Поиск по кошелька..."
    />
  );
});

export default AllWalletsTable;
