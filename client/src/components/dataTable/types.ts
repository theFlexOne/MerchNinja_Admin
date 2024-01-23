export type ColDef = {
  headerName: string;
  dataType: ColumnDefDataType;
  isVisible: boolean;
  isSortable: boolean;
  isFilterable: boolean;
};

export type ColumnDefDataType =
  | 'number'
  | 'string'
  | 'date'
  | 'dateTime'
  | 'time'
  | 'boolean'
  | 'image';
