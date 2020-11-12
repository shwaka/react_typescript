import React from 'react';
import { Human } from './Human';

type FilterFunc = (human: Human) => boolean

type MyTableProps = {
  humans: Human[];
  filter?: FilterFunc;
}

export class MyTable extends React.Component<MyTableProps> {
  constructor(props: MyTableProps) {
    super(props);
  }
  render() {
    const filter: FilterFunc = this.props.filter || ((human) => true);
    const rows = this.props.humans
                     .filter(filter)
                     .map((human) => <HumanRow human={human}
                                               key={human.name + human.age.toString()}/>);
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class HumanRow extends React.Component<{ human: Human }> {
  render() {
    const human = this.props.human
    return (
      <tr>
        <td>{human.name}</td>
        <td>{human.age}</td>
      </tr>
    )
  }
}
