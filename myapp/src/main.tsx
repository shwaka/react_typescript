import React from 'react';
import { render } from 'react-dom';
import "./mystyle.css";

class App extends React.Component {
  render() {
    const human1 = { name: "Hoge", age: 20 };
    const human2 = { name: "Fuga", age: 30};
    return <MyTable humans={[human1, human2]} />;
  }
}

type Human = {
  name: string;
  age: number;
}

type MyTableProps = {
  humans: Human[];
}

class MyTable extends React.Component<MyTableProps> {
  constructor(props: MyTableProps) {
    super(props);
  }
  render() {
    const rows = this.props.humans.map((human) => <HumanRow human={human}/>);
    return (
      <table>
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

render(<App/>, document.getElementById('app'));
