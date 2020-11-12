import React from 'react';
import { Column } from './Column';

type FilterFunc<T> = (data: T) => boolean

interface MyTableProps<T> {
  dataList: T[];
  filter?: FilterFunc<T>;
  columns: Column<T>[];
}

export interface IToKey {
  toKey(): string;
}

export class MyTable<T extends IToKey> extends React.Component<MyTableProps<T>> {
  constructor(props: MyTableProps<T>) {
    super(props);
  }
  render() {
    const filter: FilterFunc<T> = this.props.filter || ((data) => true);
    // const keys: string[] = this.props.columns.map((col) => col.key);
    const rows = this.props.dataList
                     .filter(filter)
                     .map((data) => <Row data={data} columns={this.props.columns}
                                         key={data.toKey()}/>);
    // ↓key は数値とかシンボルかもしれないので toString() してる
    return (
      <table>
        <thead>
          <tr>
            {this.props.columns.map((col) => <th key={col.key}>{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

interface IRowProps<T> {
  data: T;
  columns: Column<T>[];
}

class Row<T> extends React.Component<IRowProps<T>> {
  constructor(props: IRowProps<T>) {
    super(props);
  }
  render() {
    return (
      <tr>
        {this.props.columns.map((col) => this.createTd(col))}
      </tr>
    )
  }

  createTd(col: Column<T>): JSX.Element {
    return (
      <td key={col.key}>
        {col.toElement(this.props.data)}
      </td>
    );
  }
}
