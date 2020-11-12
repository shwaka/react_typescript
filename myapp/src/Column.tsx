export interface Column<T> {
  header: string;
  key: string;  // for list in React
  toElement(data: T): JSX.Element;
}
