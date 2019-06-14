import React from 'react';
import DrawGridElement from './DrawGridElement';

class DrawGrid extends React.Component {
  constructor(props) {
    super(props);

    this._getSvgDimention = this._getSvgDimention.bind(this);
    this._getGridData = this._getGridData.bind(this);
    this._setRoomCoords = this._setRoomCoords.bind(this);
    this._changeRoomTiles = this._changeRoomTiles.bind(this);
    this._checkClosestTails = this._checkClosestTails.bind(this);
  }

  _getSvgDimention() {
    return this.props.image;
  }

  /**
   * Если у нас активен режим редактирования проверяем можем ли мы манипулировать в текущей ячейкой
   * Если выключен - смотрим попали ли мы на каюту - если да - включаем режим редактирования
   */
  _setRoomCoords(coord) {


    const { gridMatrix } = this.props;

    if (this.props.activeRoom) {
      this._changeRoomTiles(coord);
    } else {

      const roomId = gridMatrix[coord.x][coord.y];

      if (roomId !== 0) {
        this.props._onChangeState({ activeRoom: roomId });
      }
    }
  }

  /**
   * Изменение тайлов каюты
   * 1. Проверяем не кликнули ли мы по другой каюте
   * 2. Кликнули по талку каюты
   * 3. Кликнули по незанятому тайлу
   *
   * 3.1 Ищем есть ли тайлы с id каюты которую редактируем
   *  есть - проверяем в соседнюю с ней кликнули
   *  нет - ставим первый активный тайл в любом месте
   *
   * @private
   */
  _changeRoomTiles(tile) {
    const { gridMatrix, activeRoom } = this.props;

    const currentTileId = gridMatrix[tile.x][tile.y];

    // Проверяем не кликнули ли мы по другой каюте
    if (currentTileId === 0 || currentTileId === activeRoom) {
      // Кликнули по тайлу каюты
      if (currentTileId === activeRoom) {
        gridMatrix[tile.x][tile.y] = 0;
      }

      // Кликнули по незанятому тайлу
      if (currentTileId === 0) {
        let hasTiles = false;

        //TODO уменьшить количество итераций. Повесить останов при первом вхождении
        gridMatrix.map(row => row.map(tile => {
          if (tile === activeRoom) {
            hasTiles = true;
          }
        }));
        // есть - проверяем в соседнюю с ней кликнули
        if (hasTiles) {
          const hasClosestTiles = this._checkClosestTails(tile);

          if (hasClosestTiles) {
            gridMatrix[tile.x][tile.y] = activeRoom;
          }

        }
        // нет - ставим первый активный тайл в любом месте
        else {
          gridMatrix[tile.x][tile.y] = activeRoom;
        }
      }

      this.props._onChangeState({ gridMatrix });

    } else {
      console.log('клик по другой каюте ничего не будем делать');
      return false;
    }
  }

  /**
   * Поиск по ближайшим элементам
   *
   * TODO Жесткие вычисления привести в норму
   *
   * @param tile
   * @private
   */
  _checkClosestTails(tile) {
    const { gridMatrix, activeRoom } = this.props;

    let hasClosestTail = false;

    let value;

    value = tile.x - 1;
    if (value >= 0) {
      if (gridMatrix[value][tile.y] === activeRoom) hasClosestTail = true;
    }

    value = tile.x + 1;
    if (value <= gridMatrix.length) {
      if (gridMatrix[value][tile.y] === activeRoom) hasClosestTail = true;
    }

    value = tile.y - 1;
    if (value >= 0) {
      if (gridMatrix[tile.x][value] === activeRoom) hasClosestTail = true;
    }

    value = tile.y + 1;
    if (value <= gridMatrix[0].length) {
      if (gridMatrix[tile.x][value] === activeRoom) hasClosestTail = true;
    }

    return hasClosestTail;
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

    let gridMatrix = this.props.gridMatrix;

    let usedIds = [];

    return (
      <svg viewBox={'0 0 ' + svg.width + ' ' + svg.height} width={svg.width} height={svg.height}>
        <g id={"grid"} transform={'translate(' + grid.basePoint.join(',') + ')'}>
          {
            gridMatrix.map(
              (row, rowKey) => row.map(
                (roomId, colKey) => {

                  const arPath = [];

                  if (roomId !== 0 && usedIds[roomId] === undefined) {
                    gridMatrix.map((row, y) => row.map((id, x) => {
                      if (roomId === id) arPath.push([x, y]);
                    }))

                    usedIds[roomId] = true;
                  }
                  if (roomId === 0 || arPath.length > 0) {
                    return <DrawGridElement
                      key={rowKey + colKey}
                      activeRoom={this.props.activeRoom}
                      room={this.props.rooms[roomId]}
                      roomId={roomId}
                      tiles={grid.tiles}
                      rowKey={rowKey}
                      colKey={colKey}
                      arPath={arPath}
                      _onClickEvent={obj => this._setRoomCoords(obj)}
                    />
                  }
                }))
          }
        </g>
      </svg>
    );
  }
}

export default DrawGrid;