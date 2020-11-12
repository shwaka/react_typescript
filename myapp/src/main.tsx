import React, {ChangeEvent} from 'react';
import { render } from 'react-dom';
import "./mystyle.scss";

interface IAppProps { }
interface IAppState {
  filter: FilterFunc;
  mytext: string;
  threshold: number;
}

class App extends React.Component<IAppProps, IAppState> {
  private thresholds: number[];
  constructor(props: IAppProps) {
    super(props);
    this.thresholds = [0, 10, 25, 35, 50];
    this.state = {
      filter: (human: Human) => human.age > 25,
      mytext: "hoge",
      threshold: this.thresholds[0]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleThresholdChange = this.handleThresholdChange.bind(this);
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
        </form>
        <ThresholdForm thresholds={this.thresholds} currentThreshold={this.state.threshold}
                       handleChange={this.handleThresholdChange} />
        <div>{this.state.threshold} is selected</div>
        <MyTable humans={[human1, human2, human3, human4]}
                 filter={(human: Human) => human.age > this.state.threshold}/>
        <MyTable humans={[human1, human2, human3, human4]} />
      </div>
    );
  }

  handleThresholdChange(threshold: number) {
    this.setState({threshold: threshold});
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({mytext: event.target.value});
  }
}

interface IThresholdFormProps {
  thresholds: number[];
  currentThreshold: number;
  handleChange: (threshold: number) => void;
}

class ThresholdForm extends React.Component<IThresholdFormProps> {
  constructor(props: IThresholdFormProps) {
    super(props);
  }

  render() {
    return (
      <form>
        {this.props.thresholds.map((threshold) => this.labelForThreshold(threshold))}
      </form>
    );
  }

  labelForThreshold(threshold: number) {
    const val: string = threshold.toString();
    return (
      <label key={val}>
        <input type="radio" name="myradio" value={val}
               checked={this.props.currentThreshold === threshold}
               onChange={() => this.props.handleChange(threshold)} />
        {val}
      </label>
    );
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

render(<App/>, document.getElementById('app'));
