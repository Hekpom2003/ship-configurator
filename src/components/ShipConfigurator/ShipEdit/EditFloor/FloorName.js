import React from 'react';

class FloorName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floorName: this.props.floorName,
    };

    this._onChangeState=this._onChangeState.bind(this);
  }

  _onChangeState(obj){
    this.props._onChangeState(obj);
    this.setState(obj);
  }

  render() {

    const { floorKey } = this.props;

    return (
      <div className="ship-floor__name">
        <label htmlFor={"floorName" + floorKey}>Название палубы</label>
        <input type="text"
               id={"floorName" + floorKey}
               value={this.state.floorName}
               onChange={(e) => this._onChangeState({ floorName: e.target.value })}/>
      </div>

    );
  }
}

export default FloorName;

