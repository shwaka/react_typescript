import React, {ChangeEvent} from 'react';
import { render } from 'react-dom';
import "./mystyle.scss";

interface IAppProps { }
interface IAppState {
  filter: FilterFunc;
  mytext: string;
  myradio: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      filter: (human: Human) => human.age > 25,
      mytext: "hoge",
      myradio: "foo"
    }

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const human1 = { name: "Hoge", age: 20 };
    const human2 = { name: "Fuga", age: 30 };
    const human3 = { name: "Piyo", age: 40 };
    const human4 = { name: "Foo", age: 1 };
    return (
      <div>
        <form>
          <label>
            <input type="text" value={this.state.mytext} onChange={this.handleChange} />
          </label>
          <label>
            <input type="radio" name="myradio" value="foo" checked={this.state.myradio === "foo"}
                   onChange={() => this.setState({myradio: "foo"})} />
            foo
          </label>
          <label>
            <input type="radio" name="myradio" value="bar" checked={this.state.myradio === "bar"}
                   onChange={() => this.setState({myradio: "bar"})} />
            bar
          </label>
        </form>
        <MyTable humans={[human1, human2, human3, human4]}
                 filter={this.state.filter}/>
        <MyTable humans={[human1, human2, human3, human4]} />
      </div>
    );
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({mytext: event.target.value});
  }
}

type Human = {
  name: string;
  age: number;
}

type FilterFunc = (human: Human) => boolean;

type MyTableProps = {
  humans: Human[];
  filter?: FilterFunc;
}

class MyTable extends React.Component<MyTableProps> {
  constructor(props: MyTableProps) {
    super(props);
  }
  render() {
    const filter: FilterFunc = this.props.filter || ((human) => true);
    const rows = this.props.humans
                     .filter(filter)
                     .map((human) => <HumanRow human={human}/>);
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

render(<App/>, document.getElementById('app'));
