import React, {ChangeEvent} from 'react';
import { render } from 'react-dom';
import { ThresholdForm } from './ThresholdForm';
import { Human, NameColumn, AgeColumn } from './Human';
import { MyTable } from './MyTable';
import "./mystyle.scss";

interface IAppProps { }
interface IAppState {
  filter: (human: Human) => boolean;
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
    const human1 = new Human("Hoge", 20);
    const human2 = new Human("Fuga", 30);
    const human3 = new Human("Piyo", 40);
    const human4 = new Human("Foo", 1);
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
        <MyTable dataList={[human1, human2, human3, human4]}
                 columns={[new NameColumn(), new AgeColumn()]}
                 filter={(human: Human) => human.age > this.state.threshold}/>
        <MyTable dataList={[human1, human2, human3, human4]}
                 columns={[new NameColumn(), new AgeColumn()]} />
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
