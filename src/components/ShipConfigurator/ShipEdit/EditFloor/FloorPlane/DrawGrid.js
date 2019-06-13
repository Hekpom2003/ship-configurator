import React from 'react';
import DrawGridElement from './DrawGridElement';

class DrawGrid extends React.Component {
  constructor(props) {
    super(props);

    this._getSvgDimention = this._getSvgDimention.bind(this);
    this._getGridData = this._getGridData.bind(this);
    this._setRoomCoords = this._setRoomCoords.bind(this);
  }

  _getSvgDimention() {
    const { image } = this.props;
    return image;
  }

  /**
   * Если у нас активен режим редактирования проверяем можем ли мы манипулировать в текущей ячейкой
   * Если выключен - смотрим попали ли мы на каюту - если да - включаем режим редактирования
   */
  _setRoomCoords(coord) {



    const { gridMatrix } = this.props;

    if (this.props.activeRoom) {
    } else {

      const roomId = gridMatrix[coord.x][coord.y];

      if (roomId !== 0) {
        this.props._onChangeState({ activeRoom: roomId });
      }
    }
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
                  return <DrawGridElement
                    key={rowKey + colKey}
                    isActiveRoom={this.props.activeRoom}
                    room={this.props.rooms[roomId]}
                    roomId={roomId}
                    tiles={grid.tiles}
                    rowKey={rowKey}
                    colKey={colKey}
                    _onClickEvent={obj => this._setRoomCoords(obj)}
                  />
                }))
          }
        </g>
      </svg>
    );
  }
}

export default DrawGrid;