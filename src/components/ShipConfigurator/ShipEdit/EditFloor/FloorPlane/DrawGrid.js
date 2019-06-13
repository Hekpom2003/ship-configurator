import React from 'react';
import DrawGridElement from './DrawGridElement';

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

    const cols = gridMatrix[0].length;
    const rows = gridMatrix.length;

    return {
      basePoint: [gridOffset.left, gridOffset.top],
      tiles: {
        rows,
        cols,
        width: (image.width - (gridOffset.left + gridOffset.right)) / cols,
        height: (image.height - (gridOffset.top + gridOffset.bottom)) / rows,
      }
    }
  }

  render() {

    const grid = this._getGridData();

    const svg = this._getSvgDimention();

    return (
      <svg viewBox={'0 0 ' + svg.width + ' ' + svg.height} width={svg.width} height={svg.height}>
        <g id={"grid"} transform={'translate(' + grid.basePoint.join(',') + ')'}>
          {
            this.props.gridMatrix.map(
              (row, rowKey) => row.map(
                (roomId, colKey) => {

                  let isActiveRoom = '';
                  if (this.props.activeRoom) {
                    isActiveRoom = (+this.props.activeRoom === roomId) ? '' : 'is-opacity-50';
                  }

                  return <DrawGridElement
                    key={rowKey + colKey}
                    isActiveRoom={isActiveRoom}
                    room={this.props.rooms[roomId]}
                    tiles={grid.tiles}
                    rowKey={rowKey}
                    colKey={colKey}
                  />
                }))
          }
        </g>
      </svg>
    );
  }
}

export default DrawGrid;