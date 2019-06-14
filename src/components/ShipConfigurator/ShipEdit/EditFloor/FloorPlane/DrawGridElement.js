import React from 'react';

class DrawGridElement extends React.Component {

  _getGroupTranslate(arPath) {
    let result = {
      x: Number.MAX_SAFE_INTEGER,
      y: Number.MAX_SAFE_INTEGER,
    };

    for (let item of arPath) {
      result.x = Math.min(result.x, item[0]);
      result.y = Math.min(result.y, item[1]);
    }

    return result;
  }

  render() {

    const { tiles, rowKey, colKey, room, roomId, arPath } = this.props;

    const roomClass = 'room-class--' + ((room === undefined) ? 'empty-ceil' : room.roomClass);

    let isActiveRoom = '';
    if (this.props.activeRoom) {
      isActiveRoom = (+this.props.activeRoom === this.props.roomId) ? '' : 'is-opacity-50';
    }

    let path, translate;

    if (roomId !== 0 && arPath.length > 0) {
      const groupBasePoint = this._getGroupTranslate(arPath);

      translate = (groupBasePoint.x * tiles.width) + ',' + (groupBasePoint.y * tiles.height);

      path = [];
      for (let pathItem of arPath) {

        let startPoint = {
          x: pathItem[0] - groupBasePoint.x,
          y: pathItem[1] - groupBasePoint.y,
        };

        // itemStart = itemStart.join(',');

        let itemPath = 'M' + startPoint.x * tiles.width + ',' + startPoint.y * tiles.height;
        itemPath += ' H' + (startPoint.x + 1) * tiles.width;
        itemPath += " V" + (startPoint.y + 1) * tiles.height;
        itemPath += " H" + startPoint.x * tiles.width;
        itemPath += "L" + startPoint.x * tiles.width + ',' + startPoint.y * tiles.height;

        path.push(<path key={startPoint.x + ',' + startPoint.y} d={itemPath}/>);
      }


      return (
        <g transform={"translate(" + translate + ")"}
           className={roomClass + ' ' + isActiveRoom}
           onClick={() => this.props._onClickEvent({ x: rowKey, y: colKey })}>
          {path}

          <text x="2" y="16" fill={'black'}>{room.name}</text>
        </g>
      );


    } else {
      path = 'M0,0 H' + tiles.width + " V" + tiles.height + "H0 L0,0";
      translate = (colKey * tiles.width) + ',' + (rowKey * tiles.height);

      return (
        <g transform={"translate(" + translate + ")"}
           className={roomClass + ' ' + isActiveRoom}
           onClick={() => this.props._onClickEvent({ x: rowKey, y: colKey })}>
          <path d={path}/>
        </g>
      );
    }


  }
}

export default DrawGridElement;