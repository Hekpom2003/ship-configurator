import React from 'react';
import DrawGrid from './DrawGrid';
import DrawRooms from './DrawRooms';

class PlaneLayers extends React.Component {

  constructor(props) {
    super(props);


    this._defineCell = this._defineCell.bind(this);
  }

  _defineCell() {

    const { gridSize, gridOffset, floorGrid } = this.props;

    const grid = {
      width: gridSize.width - (gridOffset.left + gridOffset.right),
      height: gridSize.height - (gridOffset.top + gridOffset.bottom),
    };

    return {
      width: grid.width / floorGrid.cols,
      height: grid.height / floorGrid.rows,
    }
  }

  render() {

    console.log('PlaneLayes', this.props);

    const { width, height } = this.props.gridSize;

    const tileSize = this._defineCell();

    const containerOffset = this.props.gridOffset.left + ',' + this.props.gridOffset.top;

    return (
      <div className="ship-floor-plane__layer">
        <img src={this.props.floorPlanImage} alt=""/>
        <svg viewBox={'0 0 ' + width + ' ' + height} width={width} height={height}>

          <DrawGrid
            {...this.props}
            tileSize={tileSize}
            containerOffset={containerOffset}
            cellStyle={{
              fill: 'transparent',
              stroke: "#ddd",
              strokeWidth: "1"
            }}
          />

          <DrawRooms
            {...this.props}
            tileSize={tileSize}
          />
        </svg>
      </div>
    );
  }


}

export default PlaneLayers;