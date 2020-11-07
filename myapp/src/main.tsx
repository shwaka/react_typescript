import React from 'react';
import { render } from 'react-dom';

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
    const divList = this.props.humans.map((human) => <div>{human.name} ({human.age})</div>);
    return (
      <div>
        {divList}
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
