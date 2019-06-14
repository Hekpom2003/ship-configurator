import React from 'react';
import CounterInput from '../../../../CounterInput';
import './FloorPlane.scss';
import PlaneLayers from './PlaneLayers';

class FloorPlane extends React.Component {
  render() {

    const { floorKey, gridOffset } = this.props;

    return (
      <div className="ship-floor__plane ship-floor-plane">

        <PlaneLayers {...this.props} _onChangeState={obj => this.props._onChangeState(obj)}
                     />

        <div className="ship-floor-plane__offset-top">
          <CounterInput
            label={''}
            id={'floorOffsetTop' + floorKey}
            value={gridOffset.top}
            _onChange={(top) => this.props._onChangeState({ gridOffset: { ...gridOffset, top } })}
          />
        </div>
        <div className="ship-floor-plane__offset-left">
          <CounterInput
            label={''}
            id={'floorOffsetLeft' + floorKey}
            value={gridOffset.left}
            _onChange={(left) => this.props._onChangeState({ gridOffset: { ...gridOffset, left } })}
          />
        </div>
        <div className="ship-floor-plane__offset-bottom">
          <CounterInput
            label={''}
            id={'floorOffsetBottom' + floorKey}
            value={gridOffset.bottom}
            _onChange={(bottom) => this.props._onChangeState({
              gridOffset: {
                ...gridOffset,
                bottom
              }
            })}
          />
        </div>
        <div className="ship-floor-plane__offset-right">
          <CounterInput
            label={''}
            id={'floorOffsetRight' + floorKey}
            value={gridOffset.right}
            _onChange={(right) => this.props._onChangeState({
              gridOffset: {
                ...gridOffset,
                right
              }
            })}
          />
        </div>
      </div>
    );
  }
}

export default FloorPlane;