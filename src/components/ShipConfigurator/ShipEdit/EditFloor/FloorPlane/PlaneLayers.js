import React from 'react';
import DrawGrid from './DrawGrid';

class PlaneLayers extends React.Component {
  render() {
    return (
      <div className="ship-floor-plane__layer">
        <img src={this.props.floorPlanImage} alt=""/>
          <DrawGrid {...this.props}  _onChangeState={obj => this.props._onChangeState(obj)} />
      </div>
    );
  }


}

export default PlaneLayers;