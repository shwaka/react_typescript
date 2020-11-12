import React, {ChangeEvent} from 'react';
import { render } from 'react-dom';
import { ThresholdForm } from './ThresholdForm';
import { Human, FilterFunc } from './Human';
import { MyTable } from './MyTable';
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

render(<App/>, document.getElementById('app'));
