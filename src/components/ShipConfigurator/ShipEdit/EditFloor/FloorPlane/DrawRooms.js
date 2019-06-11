import React from 'react';

class DrawRooms extends React.Component {
  constructor(props) {
    super(props);

    this._drawRoom = this._drawRoom.bind(this);
    this._getTiles = this._getTiles.bind(this);
  }

  /**
   * из массива item.path высчитываем левую верхнюю точку и наполняем группу тайлами
   * Получаем базовую точку
   * для каждого элемента в item.path вычисляем точку начала путем отнимания координая
   *
   *
   * @param item
   * @param key
   * @returns {*}
   * @private
   */
  _drawRoom(item, key) {

    item.path = this._prepareData(item.path);

    const basePoint = this._getBasePoint(item.path);

    const tiles = this._getTiles(item.path, basePoint);

    console.log(tiles);

    return <g id={'room' + item.id}
              key={key}
              transform={'translate(' + basePoint.x + ',' + basePoint.y + ')'}>
      {tiles}
    </g>
  }

  /**
   * Подготавливаем коордитнаты чтобы по 100 раз не сплитовать
   *
   * @param items
   * @returns {Array}
   * @private
   */
  _prepareData(items) {
    let result = [];

    for (let item of items) {
      const obItem = item.split(',');
      result.push({ x: parseFloat(item[0]), y: parseFloat(item[1]) });
    }

    return result;
  }

  _getTiles(items, basePoint) {

    let result = [];

    const { tileSize } = this.props;

    for (let item of items) {

      item = [item.x - basePoint.x, item.y - basePoint.y];
      const startPoint = item.join(',');
      const endPoint = {
        x:item[0]+tileSize.width,
        y:item[1]+tileSize.height,
      };


      const path = 'M' + startPoint + ' H' + endPoint.x + ' V' + endPoint.y + ' H0 L' + startPoint;

      result.push(<path d={path} key={path}/>);


    }

    return result;

  }

  /**
   * вычисляем левую верхнюю точку группы
   *
   * @param arItems
   * @returns {{x: number, y: number}}
   * @private
   */
  _getBasePoint(arItems) {

    let result = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };

    for (let item of arItems) {
      result.x = Math.min(result.x, item.x);
      result.y = Math.min(result.y, item.y);
    }

    return result;

  }

  render() {

    const { gridOffset } = this.props;

    console.log('DrawRooms', this.props);

    const containerOffset = gridOffset.left + ',' + gridOffset.top;

    return (
      <g id={'rooms'} transform={'translate(' + containerOffset + ')'}>
        {
          this.props.rooms.map((item, key) => this._drawRoom(item, key))
        }
      </g>
    );
  }


}

export default DrawRooms;