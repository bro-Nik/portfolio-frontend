import React, { memo } from 'react';
import { useTable } from '/app/src/hooks/useTable';
import { Table } from './Table';

const DataTable = memo(({ 
  data, 
  columnsConfig, 
  fallbackData = [], 
  placeholder = "Поиск...",
  children 
}) => {
  const { table, globalFilter, setGlobalFilter } = useTable(data, columnsConfig, fallbackData);

  return (
    <Table 
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      placeholder={placeholder}
    >
      {children}
    </Table>
  );
});

export default DataTable;
