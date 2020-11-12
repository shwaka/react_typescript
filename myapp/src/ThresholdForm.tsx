import React from 'react';

interface IThresholdFormProps {
  thresholds: number[];
  currentThreshold: number;
  handleChange: (threshold: number) => void;
}

export class ThresholdForm extends React.Component<IThresholdFormProps> {
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
