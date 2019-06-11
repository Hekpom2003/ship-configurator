import React from 'react';
import DrawGrid from './DrawGrid';

class PlaneLayers extends React.Component {
  render() {
    return (
      <div className="ship-floor-plane__layer">
        <img src={this.props.floorPlanImage} alt=""/>
          <DrawGrid {...this.props} />
      </div>
    );
  }


}

export default PlaneLayers;