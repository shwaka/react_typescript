import React from 'react';

type FilterFunc<T> = (data: T) => boolean

interface MyTableProps<T> {
  dataList: T[];
  filter?: FilterFunc<T>;
  keys: (keyof T)[];
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
    const rows = this.props.dataList
                     .filter(filter)
                     .map((data) => <Row data={data} keys={this.props.keys}
                                         key={data.toKey()}/>);
    // ↓key は数値とかシンボルかもしれないので toString() してる
    return (
      <table>
        <thead>
          <tr>
            {this.props.keys.map((key) => <th key={key.toString()}>{key}</th>)}
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
  keys: (keyof T)[];
}

class Row<T> extends React.Component<IRowProps<T>> {
  constructor(props: IRowProps<T>) {
    super(props);
  }
  render() {
    const data: T = this.props.data;
    const keys: (keyof T)[] = this.props.keys;
    return (
      <tr>
        {keys.map((key) => <td key={key.toString()}>{data[key]}</td>)}
      </tr>
    )
  }
}
