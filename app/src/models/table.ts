export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any, row: any) => JSX.Element | string | null;
}

export interface Row {
  [key: string]: any;
}
