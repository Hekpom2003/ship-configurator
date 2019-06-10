import React from 'react';
import "./style.scss";

class CounterInput extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value,
			allowNegative: (typeof this.props.allowNegative !== 'undefined' && this.props.allowNegative)
		};
		
		this.decValue = this.decValue.bind(this);
		this.incValue = this.incValue.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}
	
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
	
	render() {
		return (
			<div className="counter-input">
				<input type="text"
				       value={this.state.value}
				       onChange={this.onValueChange}
				/>
				<div className="counter-input__buttons">
					<div className="counter-input__buttons-increase" onClick={this.incValue}>
						+
					</div>
					<div className="counter-input__buttons-decrease" onClick={this.decValue}>
						-
					</div>
				</div>
			</div>
		);
	}
}

export default CounterInput;