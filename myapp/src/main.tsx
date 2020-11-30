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
        <PopupTest/>
        <TooltipTest/>
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

class PopupTest extends React.Component {
  // https://techacademy.jp/magazine/32150
  render() {
    return (
      <div className="popup-div">
        <h2>popup</h2>
        <Popup buttonText="show popup 1" popupText="popped up! (1)" />
        <Popup buttonText="show popup 2" popupText="popped up! (2)" />
        <Popup buttonText="show popup 3" popupText="popped up! (3)" />
      </div>
    );
  }
}

interface IPopupProps {
  buttonText: string;
  popupText: string;
}

class Popup extends React.Component<IPopupProps> {
  render() {
    return (
      <label>
        <span>{this.props.buttonText}</span>
        <input type="checkbox" name="checkbox"/>
        <div className="popup">
          {this.props.popupText}
        </div>
      </label>
    );
  }
}

class TooltipTest extends React.Component {
  render() {
    return (
      <div className="tooltip-div">
        <h2>tooltip</h2>
        {Array.from({length: 10}, (v, k) => k).map((n) => <Tooltip buttonText={`show tooltip ${n}`}
                                       tooltipText={`text ${n}`}/>)}
      </div>
    )
  }
}

interface ITooltipProps {
  buttonText: string;
  tooltipText: string;
}

class Tooltip extends React.Component<ITooltipProps> {
  render() {
    return (
      <span className="tooltip">
        <span className="button">{this.props.buttonText}</span>
        <div className="description">{this.props.tooltipText}</div>
      </span>
    )
  }
}

render(<App/>, document.getElementById('app'));
