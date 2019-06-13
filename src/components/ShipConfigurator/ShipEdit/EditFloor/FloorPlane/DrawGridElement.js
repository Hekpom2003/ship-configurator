import React from 'react';

class DrawGridElement extends React.Component {

  render() {

    const { tiles, rowKey, colKey, room, roomId } = this.props;

    const path = 'M0,0 H' + tiles.width + " V" + tiles.height + "H0 L0,0";

    const translate = (colKey * tiles.width) + ',' + (rowKey * tiles.height);

    const roomClass = 'room-class--' + ((room === undefined) ? 'empty-ceil' : room.roomClass);

    let isActiveRoom = '';

    if (this.props.activeRoom) {
      isActiveRoom = (+this.props.activeRoom === this.props.roomId) ? '' : 'is-opacity-50';
    }


    return (
      <g transform={"translate(" + translate + ")"}
         className={roomClass + ' ' + isActiveRoom}
         onClick={() => this.props._onClickEvent({ x: rowKey, y: colKey })}>
        <path d={path}/>
      </g>
    );
  }
}

export default DrawGridElement;