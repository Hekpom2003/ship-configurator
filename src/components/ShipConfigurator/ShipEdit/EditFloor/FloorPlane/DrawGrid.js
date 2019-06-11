import React from 'react';

class DrawGrid extends React.Component {
  constructor(props) {
    super(props);

    this._getSvgDimention = this._getSvgDimention.bind(this);
    this._getGridData = this._getGridData.bind(this);
  }

  _getSvgDimention() {
    const { image } = this.props;
    return image;
  }

  _getGridData() {

    const { gridMatrix, image, gridOffset } = this.props;

    return {
      basePoint: [gridOffset.left, gridOffset.top],
      tiles: {
        rows: gridMatrix.length,
        cols: gridMatrix[0].length,
      }
    }
  }

  render() {

    console.log('DrawGrid', this.props);

    const grid = this._getGridData();

    const svg = this._getSvgDimention();

    return (
      <svg viewBox={'0 0 ' + svg.width + ' ' + svg.height} width={svg.width} height={svg.height}>
        <g id={"grid"} transform={'translate(' + grid.basePoint.join(',') + ')'}>
          {
            //TODO stopHere
            // this.props.gridMatrix.map((row, rowKey) => row.map((ceil,colKey)=>));
          }
        </g>
      </svg>
    );
  }
}

export default DrawGrid;