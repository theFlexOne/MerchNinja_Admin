import { useReducer } from 'react';
import { ColDef } from './types';

function dataTableReducer(
  state: DataTableState,
  action: DataTableAction
): DataTableState {
  switch (action.type) {
    case 'SORT': {
      const sortedData = sortData(state, action.payload);
      return sortedData;
    }
    case 'FILTER': {
      const filteredData = filterData(state, action.payload);
      return filteredData;
    }
    case 'RESET': {
      const resetData = resetDataTable(state);
      return resetData;
    }
    case 'SELECT_ROW': {
      const selectedRow = selectRow(state, action.payload);
      return selectedRow;
    }
    default:
      return state;
  }
}

export default function useDataTable({
  columns,
  data,
}: UseDataTableProps): UseDataTableReturn {
  const [state, dispatch] = useReducer(dataTableReducer, {
    columns,
    data,
    filteredData: data,
    selectedData: [],
    sortColumn: '',
    sortOrder: 'asc',
    filterColumn: '',
    filterValue: '',
  });

  return { state, dispatch };
}

function sortData(
  state: DataTableState,
  payload: { column: string; order: 'asc' | 'desc' }
): DataTableState {
  const { column, order } = payload;
  const { data } = state;

  const sortedData = data.sort((a, b) => {
    const aValue = a[column] as string;
    const bValue = b[column] as string;

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return {
    ...state,
    data: sortedData,
    filteredData: sortedData,
    sortColumn: column,
    sortOrder: order,
  };
}

function filterData(
  state: DataTableState,
  payload: { column: string; value: string }
): DataTableState {
  const { column, value } = payload;
  const { data } = state;

  const filteredData = data.filter((row) => {
    const rowValue = row[column] as string;
    return rowValue.toLowerCase().includes(value.toLowerCase());
  });

  return {
    ...state,
    filteredData,
    filterColumn: column,
    filterValue: value,
  };
}

function resetDataTable(state: DataTableState): DataTableState {
  const { data } = state;
  return {
    ...state,
    filteredData: data,
    sortColumn: '',
    sortOrder: 'asc',
    filterColumn: '',
    filterValue: '',
  };
}

function selectRow(
  state: DataTableState,
  payload: { row: Record<string, unknown> }
): DataTableState {
  const { row } = payload;
  const { selectedData } = state;

  const isSelected = selectedData?.find((r) => r === row);

  if (isSelected) {
    const filteredSelectedData = selectedData.filter((r) => r !== row);
    return {
      ...state,
      selectedData: filteredSelectedData,
    };
  }

  return {
    ...state,
    selectedData: [...selectedData, row],
  };
}

type UseDataTableProps = {
  columns: ColDef[];
  data: Record<string, unknown>[];
  onRowClick?: (rowData: Record<string, unknown>) => void;
};

type UseDataTableReturn = {
  state: DataTableState;
  dispatch: React.Dispatch<DataTableAction>;
};

type DataTableState = {
  columns: ColDef[];
  data: Record<string, unknown>[];
  filteredData: Record<string, unknown>[];
  selectedData: Record<string, unknown>[];
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
  filterColumn: string;
  filterValue: string;
};

type DataTableAction =
  | { type: 'SORT'; payload: { column: string; order: 'asc' | 'desc' } }
  | { type: 'FILTER'; payload: { column: string; value: string } }
  | { type: 'RESET' }
  | { type: 'SELECT_ROW'; payload: { row: Record<string, unknown> } };
