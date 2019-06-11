import React from 'react';
import "./style.scss";

class CounterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: parseInt(this.props.value),
      // allowNegative: (typeof this.props.allowNegative !== 'undefined' && this.props.allowNegative)
    };

    // this.decValue = this.decValue.bind(this);
    // this.incValue = this.incValue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  /*
  decValue() {
    this.onValueChange({
      target: {
        value: parseInt(this.state.value) - 1
      }
    });
  }

  incValue() {
    this.onValueChange({
      target: {
        value: parseInt(this.state.value) + 1
      }
    });
  }

  onValueChange(e) {
    let tgtVal = parseInt(e.target.value);

    if (isNaN(tgtVal))
      tgtVal = 1;

    if (!this.state.allowNegative && tgtVal < 0) {
      tgtVal = 0;
    }

    this.setState({value: tgtVal});

    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(tgtVal);
    }

  }

   */

  onValueChange(value) {
    value = parseInt(value);

    if (isNaN(value))
      value = 1;

    if (value < 1) {
      value = 1;
    }

    this.props._onChange(value);
    this.setState({ value });

  }

  render() {
    const { id } = this.props;

    let label = '';
    if (this.props.label) {
      label = <label htmlFor={id}>{this.props.label}</label>;
    }

    return (
      <div className="counter-input">
        {label}
        <input type="text"
               value={this.state.value}
               onChange={(e) => this.onValueChange(e.target.value)}
        />
        <div className="counter-input__buttons">
          <div className="counter-input__buttons-increase"
               onClick={() => this.onValueChange(this.state.value + 1)}>
            +
          </div>
          <div className="counter-input__buttons-decrease"
               onClick={() => this.onValueChange(this.state.value - 1)}>
            -
          </div>
        </div>
      </div>
    );
  }
}

export default CounterInput;